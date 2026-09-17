import React from "react";
import { Building2, Users, ThumbsUp } from "lucide-react";

const stats = [
  { value: "10K+", label: "Active Clients", icon: Building2 },
  { value: "100K+", label: "Active Jobseekers", icon: Users },
  { value: "98%", label: "Customer Satisfaction", icon: ThumbsUp },
];

export default function StatsSection() {
  return (
    <section className="border-t border-b border-slate-100 bg-[#F8FAFC] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size={32} />
                </div>
                <div className="text-4xl font-extrabold text-slate-800">
                  {stat.value}
                </div>
                <div className="mt-2 text-base font-medium text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
