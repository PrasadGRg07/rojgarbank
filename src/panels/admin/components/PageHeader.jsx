import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {buttonText && buttonLink && (
        <NavLink
          to={buttonLink}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={18} />
          {buttonText}
        </NavLink>
      )}
    </div>
  );
}