import { PROVINCES, WORK_MODES } from "../utils/constants";

export default function LocationSection({
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
          Job Location
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Tell applicants where they'll be working.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Province */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Province *
          </label>

          <select
            name="province"
            value={data.province}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Province</option>

            {PROVINCES.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>

          {errors.province && (
            <p className="mt-1 text-sm text-red-500">
              {errors.province}
            </p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            District *
          </label>

          <input
            type="text"
            name="district"
            value={data.district}
            onChange={handleChange}
            placeholder="Enter district"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Municipality */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Municipality
          </label>

          <input
            type="text"
            name="municipality"
            value={data.municipality}
            onChange={handleChange}
            placeholder="Municipality / Rural Municipality"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Work Mode */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Work Mode *
          </label>

          <select
            name="workMode"
            value={data.workMode}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            {WORK_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Complete Address
          </label>

          <textarea
            rows={3}
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Street, Ward No., Landmark..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Google Maps */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Google Maps Link (Optional)
          </label>

          <input
            type="url"
            name="mapLink"
            value={data.mapLink}
            onChange={handleChange}
            placeholder="https://maps.google.com/..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Travel */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 cursor-pointer">

            <input
              type="checkbox"
              name="travelRequired"
              checked={data.travelRequired}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <div>
              <p className="font-medium text-slate-700">
                Travel Required
              </p>

              <p className="text-sm text-slate-500">
                Check this if employees are expected to travel for work.
              </p>
            </div>

          </label>
        </div>

      </div>
    </div>
  );
}