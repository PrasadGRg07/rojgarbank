const statusStyles = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-700",
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-purple-100 text-purple-700",
  expired: "bg-orange-100 text-orange-700",
};

export default function StatusBadge({
  status = "",
}) {
  const key = status.toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[key] ||
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}