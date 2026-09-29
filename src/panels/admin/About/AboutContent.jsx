import { useEffect, useState } from "react";
import { ExternalLink, RotateCw } from "lucide-react";

import PageHeader from "../components/PageHeader";
import { getManageAbout } from "../../../lib/aboutApi";
import GeneralTab from "./GeneralTab";
import ItemsTab from "./ItemsTab";
import { COLLECTIONS } from "./aboutConfig";

export default function AboutContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    getManageAbout()
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError("Could not load the About page content.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const refresh = () => setReloadKey((key) => key + 1);

  const retry = () => {
    setError("");
    setData(null);
    setLoading(true);
    refresh();
  };

  const tabs = [
    { key: "general", label: "General" },
    ...COLLECTIONS.map((collection) => ({
      key: collection.key,
      label: collection.label,
      count: data?.[collection.key]?.length ?? 0,
    })),
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="About Page"
        subtitle="Control everything shown on the public About Us page."
      />

      {loading && <p className="text-gray-500">Loading About page content...</p>}

      {error && !loading && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-1.5 font-medium hover:underline"
          >
            <RotateCw size={15} />
            Retry
          </button>
        </div>
      )}

      {data && !error && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Last updated{" "}
              {data.page.updated_at
                ? new Date(data.page.updated_at).toLocaleString()
                : "never"}
              {data.page.updated_by_name ? ` by ${data.page.updated_by_name}` : ""}.
            </p>

            <a
              href="/about"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ExternalLink size={16} />
              View public page
            </a>
          </div>

          <div className="flex flex-wrap gap-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "general" ? (
            <GeneralTab
              key={JSON.stringify(data.page)}
              page={data.page}
              onChanged={refresh}
            />
          ) : (
            <ItemsTab
              key={activeTab}
              config={COLLECTIONS.find((entry) => entry.key === activeTab)}
              items={data[activeTab]}
              onChanged={refresh}
            />
          )}
        </>
      )}
    </div>
  );
}
