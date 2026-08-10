import TagInput from "./TagInput";

export default function ApplicationSection({
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
          Application Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure how candidates will apply for this position.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Deadline */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Application Deadline *
          </label>

          <input
            type="date"
            name="applicationDeadline"
            value={data.applicationDeadline}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          {errors.applicationDeadline && (
            <p className="mt-1 text-sm text-red-500">
              {errors.applicationDeadline}
            </p>
          )}
        </div>

        {/* Expected Joining Date */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Expected Joining Date
          </label>

          <input
            type="date"
            name="joiningDate"
            value={data.joiningDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Contact Email *
          </label>

          <input
            type="email"
            name="contactEmail"
            value={data.contactEmail}
            onChange={handleChange}
            placeholder="hr@company.com"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Contact Phone
          </label>

          <input
            type="text"
            name="contactPhone"
            value={data.contactPhone}
            onChange={handleChange}
            placeholder="+977-98XXXXXXXX"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Required Documents */}
        <div className="md:col-span-2">
          <TagInput
            label="Required Documents"
            value={data.requiredDocuments}
            onChange={(requiredDocuments) =>
              onChange({ requiredDocuments })
            }
            placeholder="Resume"
          />
        </div>

        {/* Options */}
        <div className="md:col-span-2 space-y-4">

          <label className="flex items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="acceptUntilFilled"
              checked={data.acceptUntilFilled}
              onChange={handleChange}
            />
            <span>Accept applications until the position is filled</span>
          </label>

          <label className="flex items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="sendConfirmationEmail"
              checked={data.sendConfirmationEmail}
              onChange={handleChange}
            />
            <span>Send confirmation email automatically</span>
          </label>

          <label className="flex items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="allowQuickApply"
              checked={data.allowQuickApply}
              onChange={handleChange}
            />
            <span>Enable Quick Apply</span>
          </label>

        </div>

      </div>

    </div>
  );
}