import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {buttonText && buttonLink && (
        <NavLink
          to={buttonLink}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 md:w-auto"
        >
          <Plus size={18} />
          {buttonText}
        </NavLink>
      )}
    </div>
  );
}
