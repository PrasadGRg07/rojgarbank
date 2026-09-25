import { Briefcase, Clock, CircleCheck, CircleX } from "lucide-react";

const pipeline = [
  {
    title: "Total Jobs",
    value: 500,
    icon: Briefcase,
    tint: "bg-blue-50 text-blue-600",
    valueColor: "text-slate-800",
  },
  {
    title: "Pending Review",
    value: 25,
    icon: Clock,
    tint: "bg-amber-50 text-amber-600",
    valueColor: "text-amber-600",
  },
  {
    title: "Approved",
    value: 450,
    icon: CircleCheck,
    tint: "bg-emerald-50 text-emerald-600",
    valueColor: "text-emerald-600",
  },
  {
    title: "Rejected",
    value: 25,
    icon: CircleX,
    tint: "bg-rose-50 text-rose-600",
    valueColor: "text-rose-600",
  },
];

export default function JobStatistics() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-800">
          Job Pipeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review status of all submitted jobs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {pipeline.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.tint}`}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm text-slate-500">
                  {item.title}
                </p>

                <p
                  className={`mt-1 text-2xl font-bold tabular-nums ${item.valueColor}`}
                >
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
