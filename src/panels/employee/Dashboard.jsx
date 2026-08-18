import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardSkeleton from "./components/DashboardSkeleton";
import WelcomeSubscriptionPopup from "./subscription/WelcomeSubscriptionPopup";

// Lazy Components
const ResumeSearchStats = lazy(() =>
  import("./components/ResumeSearchStats")
);

const AvailableProducts = lazy(() =>
  import("./components/AvailableProducts")
);

export default function Dashboard() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(true); // optimistic default

  // Fetch dashboard data + subscription status on mount
  useEffect(() => {
    let mounted = true;

    async function fetchDashboard() {
      try {
        const { data } = await api.get("/employee/dashboard/");
        if (mounted) setDashboardData(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    async function fetchSubscription() {
      // Special accounts have unlimited access — skip subscription check entirely
      if (user?.is_special_account) {
        setHasActiveSubscription(true);
        return;
      }
      try {
        const { data } = await api.get("/employee/subscriptions/");
        const active = data.some((s) => s.status === "active");
        if (mounted) setHasActiveSubscription(active);
      } catch (err) {
        // If we can't fetch, assume no subscription
        if (mounted) setHasActiveSubscription(false);
      }
    }

    fetchDashboard();
    fetchSubscription();

    return () => { mounted = false; };
  }, []);

  // Repeating popup interval for non-subscribed users
  useEffect(() => {
    // Never show popup to special account holders
    if (user?.is_special_account) return;
    if (hasActiveSubscription) return; // do nothing if subscribed

    // Show immediately on first render
    setShowWelcome(true);

    const scheduleNext = () => {
      // Random delay between 5 000 ms and 10 000 ms
      const delay = Math.floor(Math.random() * 5000) + 5000;
      return setTimeout(() => {
        setShowWelcome(true);
        // schedule the next one after this one is set
        intervalRef.current = scheduleNext();
      }, delay);
    };

    const intervalRef = { current: null };
    intervalRef.current = scheduleNext();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [hasActiveSubscription]);



  const handleLogout = useCallback(() => {
    logout();
    navigate("/employee/login");
  }, [logout, navigate]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  // Show right widgets only on dashboard home
  const showRightWidgets = useMemo(() => {
    return location.pathname === "/employee/dashboard";
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <WelcomeSubscriptionPopup open={showWelcome} onClose={handleCloseWelcome} />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          user={user}
        />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <Header
            user={user}
            onMenuClick={() => setMobileNavOpen(true)}
            onLogout={handleLogout}
            notificationCount={3}
          />

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div
              className={`mx-auto w-full ${showRightWidgets
                  ? "max-w-7xl"
                  : "max-w-screen-2xl"
                }`}
            >
              {showRightWidgets ? (
                // Dashboard Home Layout
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                  {/* Main */}
                  <div className="space-y-6 xl:col-span-3">
                    <Outlet
                      context={{
                        dashboardData,
                        user,
                      }}
                    />
                  </div>

                  {/* Right Sidebar */}
                  <div className="space-y-6">
                    <Suspense fallback={<DashboardSkeleton />}>
                      <ResumeSearchStats
                        stats={{
                          searches:
                            dashboardData?.resume_searches ?? 0,
                          viewed:
                            dashboardData?.resume_viewed ?? 0,
                          saved:
                            dashboardData?.resume_saved ?? 0,
                          candidates:
                            dashboardData?.total_candidates ?? 0,
                        }}
                      />

                      <AvailableProducts />
                    </Suspense>
                  </div>
                </div>
              ) : (
                // All Other Pages
                <Outlet
                  context={{
                    dashboardData,
                    user,
                  }}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}