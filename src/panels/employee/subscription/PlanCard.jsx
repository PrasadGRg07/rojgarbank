import { CheckCircle2 } from "lucide-react";

export default function PlanCard({
  name,
  price,
  description,
  features,
  selected = false,
  buttonText,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        selected
          ? "border-blue-600 bg-blue-600 text-white shadow-2xl"
          : "border-slate-200 bg-white shadow-lg"
      }`}
    >
      {selected && (
        <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-600">
          Selected
        </div>
      )}

      <div className="p-8">
        <h2 className="text-3xl font-bold">{name}</h2>

        <p
          className={`mt-3 ${
            selected ? "text-blue-100" : "text-slate-500"
          }`}
        >
          {description}
        </p>

        <div className="mt-8">
          <span className="text-5xl font-extrabold">{price}</span>

          {price !== "Custom" && (
            <span
              className={`ml-2 ${
                selected ? "text-blue-100" : "text-slate-500"
              }`}
            >
              /month
            </span>
          )}
        </div>

        <div
          className={`my-8 h-px ${
            selected ? "bg-white/20" : "bg-slate-200"
          }`}
        />

        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle2
                size={20}
                className={selected ? "text-green-300" : "text-green-500"}
              />

              <span className={selected ? "text-white" : "text-slate-700"}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`mt-10 w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
            selected
              ? "bg-white text-blue-600 hover:bg-slate-100"
              : "border border-slate-300 bg-white text-slate-700 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {selected ? "Selected Plan" : buttonText}
        </button>
      </div>
    </div>
  );
}