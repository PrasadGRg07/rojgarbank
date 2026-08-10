export default function DescriptionSection({
  data,
  onChange,
  errors = {},
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({
      [name]: value,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Job Description
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Describe the role, responsibilities, and qualifications.
        </p>
      </div>

      <div className="space-y-6">

        {/* Short Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Short Description *
          </label>

          <input
            type="text"
            name="shortDescription"
            value={data.shortDescription}
            onChange={handleChange}
            placeholder="A short summary of the job..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          {errors.shortDescription && (
            <p className="mt-1 text-sm text-red-500">
              {errors.shortDescription}
            </p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Job Description *
          </label>

          <textarea
            rows={6}
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Describe the role, day-to-day work, and expectations..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        {/* Responsibilities */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Key Responsibilities *
          </label>

          <textarea
            rows={5}
            name="responsibilities"
            value={data.responsibilities}
            onChange={handleChange}
            placeholder="• Develop web applications&#10;• Collaborate with team members&#10;• Maintain code quality"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          {errors.responsibilities && (
            <p className="mt-1 text-sm text-red-500">
              {errors.responsibilities}
            </p>
          )}
        </div>

        {/* Qualifications */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Qualifications *
          </label>

          <textarea
            rows={5}
            name="qualifications"
            value={data.qualifications}
            onChange={handleChange}
            placeholder="Bachelor's degree, relevant experience, certifications..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          {errors.qualifications && (
            <p className="mt-1 text-sm text-red-500">
              {errors.qualifications}
            </p>
          )}
        </div>

        {/* Why Join Us */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Why Join Us
          </label>

          <textarea
            rows={4}
            name="whyJoinUs"
            value={data.whyJoinUs}
            onChange={handleChange}
            placeholder="Highlight company culture, growth opportunities, and benefits..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

      </div>
    </div>
  );
}