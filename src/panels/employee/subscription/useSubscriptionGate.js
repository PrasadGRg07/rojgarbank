import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { getJobPostingStatus } from "../../../lib/subscriptionApi";

/**
 * Owns the subscription popup + job-posting entitlement for the employee
 * dashboard.
 *
 * Rules it enforces (see the backend mirror in apps/employee/plan_utils.py):
 *
 *  - Entitlement always comes from the API, never from localStorage, so a
 *    refresh / new tab / re-login can never disagree with the database.
 *  - A dismissed popup stays dismissed. There is no repeating timer; the
 *    previous 5-10s re-pop loop was the main source of duplicate popups.
 *  - Paid (or special) accounts never see the popup.
 *  - The popup opens at most once per session per trigger. A *new* business
 *    event (just used the free job, or just got blocked) re-opens it, which
 *    is what makes the upgrade prompt useful.
 *
 * Two independent triggers, each with its own persisted dismissal flag:
 *   "welcome" - first visit on the Free Plan (0 jobs posted)
 *   "quota"   - the single free job has been used
 */

const STORAGE_KEY = "rojgar:subscription-popup";

export const SubscriptionGateContext = createContext(null);

export const useSubscriptionGateContext = () => useContext(SubscriptionGateContext);

const readDismissed = (userKey) => {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(`${STORAGE_KEY}:${userKey}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeDismissed = (userKey, value) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(`${STORAGE_KEY}:${userKey}`, JSON.stringify(value));
  } catch {
    /* storage full or blocked - the popup just shows again next visit */
  }
};

/** Which popup, if any, should be shown for a given entitlement. */
const resolveAutoMode = (status, dismissed) => {
  if (!status) return null;
  // Never nag a paying (or special) account.
  if (status.is_paid) return null;

  if (status.requires_subscription) {
    return dismissed.quota ? null : "quota";
  }

  return dismissed.welcome ? null : "welcome";
};

export function useSubscriptionGate({ user }) {
  const userKey = user?.id ?? user?.username ?? "anonymous";

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(null);

  // Guards the auto-open effect so re-renders, route changes and StrictMode
  // double-invocation cannot re-trigger a popup that was already decided.
  const autoDecidedFor = useRef(null);

  const refresh = useCallback(async () => {
    try {
      const data = await getJobPostingStatus();
      setStatus(data);
      return data;
    } catch (error) {
      console.error("Failed to load job posting status:", error);
      // Fail closed on the *popup* but never on posting: the backend is the
      // real gate, so a failed fetch must not lock an employer out of work.
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load, then decide once whether to auto-open.
  useEffect(() => {
    let active = true;

    (async () => {
      const data = await getJobPostingStatus().catch((error) => {
        console.error("Failed to load job posting status:", error);
        return null;
      });

      if (!active) return;

      setStatus(data);
      setLoading(false);

      if (data) {
        const nextMode = resolveAutoMode(data, readDismissed(userKey));
        autoDecidedFor.current = `${userKey}:${data.plan}:${data.posted_jobs}`;
        setMode(nextMode);
      }
    })();

    return () => {
      active = false;
    };
  }, [userKey]);

  const dismiss = useCallback(
    (which) => {
      setMode(null);

      const target = which ?? "welcome";
      const dismissed = readDismissed(userKey);

      writeDismissed(userKey, { ...dismissed, [target]: true });
    },
    [userKey]
  );

  /**
   * Called right after a successful job publish. Re-reads the backend (the
   * quota moved) and force-opens the upgrade prompt, because using the free
   * job is a new event that deserves a fresh prompt.
   */
  const notifyJobPosted = useCallback(async () => {
    const data = await refresh();
    if (!data || data.is_paid) return;

    setMode("quota");
  }, [refresh]);

  /**
   * Called when a publish is rejected by the backend quota gate. The employer
   * just tried to post again, so re-open the prompt regardless of the
   * persisted dismissal.
   */
  const notifyPostBlocked = useCallback(
    (error) => {
      const serverStatus = error?.response?.data;

      if (serverStatus) {
        setStatus((prev) => ({ ...(prev || {}), ...serverStatus }));
      } else {
        refresh();
      }

      setMode("quota");
    },
    [refresh]
  );

  return {
    status,
    loading,
    mode,
    isOpen: mode !== null,
    canPostJob: status?.can_post_job ?? true,
    dismiss,
    refresh,
    notifyJobPosted,
    notifyPostBlocked,
  };
}
