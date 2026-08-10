import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AnalyticsPageHeader({
  title,
  description,
  icon: Icon,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-lg">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
            {Icon && <Icon size={30} />}
          </div>

          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              {title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-blue-100 md:text-base">
              {description}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/dashboard/analytics")}
          className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white/25"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>
    </div>
  );
}