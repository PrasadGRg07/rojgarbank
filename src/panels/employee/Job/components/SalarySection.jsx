import { CURRENCIES, SALARY_TYPES } from "../utils/constants";

// Format a number as NPR Nepali style (e.g. 100000 → "1,00,000")
function formatNPR(value) {
  if (!value && value !== 0) return "";
  const num = Number(value);
  if (isNaN(num)) return "";
  return num.toLocaleString("en-IN"); // en-IN gives lakh/crore grouping
}

export default function SalarySection({
  data,
  onChange,
  errors = {},
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    onChange({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Salary &amp; Compensation
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Specify the salary range and compensation details for this position.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Currency */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Currency *
          </label>

          <select
            name="currency"
            value={data.currency}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Currency</option>

            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          {errors.currency && (
            <p className="mt-1 text-sm text-red-500">
              {errors.currency}
            </p>
          )}
        </div>

        {/* Salary Type */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Salary Type *
          </label>

          <select
            name="salaryType"
            value={data.salaryType}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Salary Type</option>

            {SALARY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {errors.salaryType && (
            <p className="mt-1 text-sm text-red-500">
              {errors.salaryType}
            </p>
          )}
        </div>

        {/* Minimum Salary */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Minimum Salary *
          </label>

          <input
            type="number"
            name="salaryMin"
            value={data.salaryMin}
            onChange={handleChange}
            placeholder="e.g. 100000"
            min="0"
            max="99999999"
            step="1000"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          {data.salaryMin && (
            <p className="mt-1 text-xs text-slate-500 font-medium">
              {data.currency || "NPR"} {formatNPR(data.salaryMin)}
            </p>
          )}

          {errors.salaryMin && (
            <p className="mt-1 text-sm text-red-500">
              {errors.salaryMin}
            </p>
          )}
        </div>

        {/* Maximum Salary */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Maximum Salary *
          </label>

          <input
            type="number"
            name="salaryMax"
            value={data.salaryMax}
            onChange={handleChange}
            placeholder="e.g. 150000"
            min="0"
            max="99999999"
            step="1000"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          {data.salaryMax && (
            <p className="mt-1 text-xs text-slate-500 font-medium">
              {data.currency || "NPR"} {formatNPR(data.salaryMax)}
            </p>
          )}

          {errors.salaryMax && (
            <p className="mt-1 text-sm text-red-500">
              {errors.salaryMax}
            </p>
          )}
        </div>

        {/* Negotiable */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 cursor-pointer">

            <input
              type="checkbox"
              name="negotiable"
              checked={data.negotiable}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <div>
              <p className="font-medium text-slate-700">
                Salary is Negotiable
              </p>

              <p className="text-sm text-slate-500">
                Enable this if the salary can be discussed during the hiring process.
              </p>
            </div>

          </label>
        </div>

        {/* Hide Salary */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 cursor-pointer">

            <input
              type="checkbox"
              name="hideSalary"
              checked={data.hideSalary}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <div>
              <p className="font-medium text-slate-700">
                Hide Salary from Job Seekers
              </p>

              <p className="text-sm text-slate-500">
                Salary will not be displayed publicly.
              </p>
            </div>

          </label>
        </div>

      </div>

    </div>
  );
}