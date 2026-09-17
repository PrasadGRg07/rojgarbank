import React from "react";
import { Users, Globe, Building2, HeadphonesIcon } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Jobseekers",
    desc: "100K+ registered jobseekers",
  },
  {
    icon: Globe,
    title: "Website Traffic",
    desc: "Thousands of visitors every month",
  },
  {
    icon: Building2,
    title: "Companies",
    desc: "Businesses connected through our platform",
  },
  {
    icon: HeadphonesIcon,
    title: "Support",
    desc: "Continuous support throughout your hiring process",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Why Work With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
                  <Icon size={36} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-800">
                  {r.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
