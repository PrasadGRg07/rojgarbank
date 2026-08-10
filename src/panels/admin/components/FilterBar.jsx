export default function FilterBar({
  filters = [],
  values = {},
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <select
          key={filter.key}
          value={values[filter.key] || ""}
          onChange={(e) =>
            onChange(filter.key, e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2.5 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">
            All {filter.label}
          </option>

          {filter.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}