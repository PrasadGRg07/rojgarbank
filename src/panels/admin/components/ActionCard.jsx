import { NavLink } from "react-router-dom";

export default function ActionCard({
  title,
  description,
  icon: Icon,
  color,
  path,
}) {
  return (
    <NavLink
      to={path}
      className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300"
    >
      <div
        className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}
      >
        <Icon size={26} />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>
    </NavLink>
  );
}
