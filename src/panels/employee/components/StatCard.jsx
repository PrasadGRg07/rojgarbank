import React from "react";

function StatCard({ label, value, tint = "bg-white" }) {
  return (
    <div
      className={`
        ${tint}
        rounded-2xl
        p-6
        shadow-sm
        border
        border-slate-200
        hover:shadow-md
        transition-all
        duration-300
      `}
    >
      <h3 className="text-4xl font-bold text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default React.memo(StatCard);