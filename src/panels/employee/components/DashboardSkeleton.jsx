import React, { memo } from "react";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-10 w-20 rounded bg-slate-200"></div>

      <div className="mt-4 h-4 w-32 rounded bg-slate-200"></div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 h-6 w-56 rounded bg-slate-200"></div>

      {[1, 2, 3, 4].map((row) => (
        <div
          key={row}
          className="mb-4 flex items-center gap-4"
        >
          <div className="h-10 w-10 rounded-full bg-slate-200"></div>

          <div className="flex-1">
            <div className="h-4 w-40 rounded bg-slate-200"></div>

            <div className="mt-2 h-3 w-28 rounded bg-slate-100"></div>
          </div>

          <div className="h-4 w-20 rounded bg-slate-200"></div>
        </div>
      ))}
    </div>
  );
}

function SkeletonWidget() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 h-6 w-44 rounded bg-slate-200"></div>

      {[1, 2, 3].map((item) => (
        <div key={item} className="mb-5">
          <div className="mb-2 h-4 w-36 rounded bg-slate-200"></div>

          <div className="h-2 w-full rounded-full bg-slate-200"></div>
        </div>
      ))}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="animate-pulse">
        <div className="h-8 w-72 rounded bg-slate-200"></div>

        <div className="mt-3 h-4 w-52 rounded bg-slate-100"></div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SkeletonTable />
        </div>

        <div className="space-y-6">
          <SkeletonWidget />
          <SkeletonWidget />
        </div>
      </div>
    </div>
  );
}

export default memo(DashboardSkeleton);