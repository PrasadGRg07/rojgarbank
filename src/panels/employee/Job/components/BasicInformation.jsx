import {
  JOB_CATEGORIES,
  JOB_SUBCATEGORIES,
  EMPLOYMENT_TYPES,
  JOB_LEVELS,
  WORKPLACE_TYPES,
} from "../utils/constants";

export default function BasicInformation({
  data = {},
  onChange,
  errors = {},
}) {
  const subCategories =
    JOB_SUBCATEGORIES[data?.mainCategory] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mainCategory") {
      onChange({
        mainCategory: value,
        subCategory: "",
      });
      return;
    }

    onChange({
      [name]: value,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Provide the essential information about this job.
        </p>
      </div>


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


        {/* Job Title */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Job Title *
          </label>

          <input
            type="text"
            name="title"
            value={data?.title || ""}
            onChange={handleChange}
            placeholder="e.g. React Frontend Developer"
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title}
            </p>
          )}
        </div>


        {/* Main Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Main Category *
          </label>

          <select
            name="mainCategory"
            value={data?.mainCategory || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select Category
            </option>

            {JOB_CATEGORIES.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>
        </div>


        {/* Sub Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sub Category
          </label>

          <select
            name="subCategory"
            value={data?.subCategory || ""}
            onChange={handleChange}
            disabled={!data?.mainCategory}
            className="w-full rounded-lg border p-3 disabled:bg-gray-100"
          >

            <option value="">
              Select Sub Category
            </option>

            {subCategories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>
        </div>


        {/* Employment Type */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Employment Type *
          </label>

          <select
            name="employmentType"
            value={data?.employmentType || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >

            <option value="">
              Select Employment Type
            </option>

            {EMPLOYMENT_TYPES.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>
        </div>


        {/* Job Level */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Job Level *
          </label>

          <select
            name="jobLevel"
            value={data?.jobLevel || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >

            <option value="">
              Select Job Level
            </option>

            {JOB_LEVELS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>
        </div>


        {/* Openings */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Number of Openings *
          </label>

          <input
            type="number"
            min="1"
            name="openings"
            value={data?.openings || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

        </div>


        {/* Workplace */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Workplace *
          </label>

          <select
            name="workplace"
            value={data?.workplace || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >

            <option value="">
              Select Workplace
            </option>

            {WORKPLACE_TYPES.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>
        </div>


        {/* Department */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Department
          </label>

          <input
            type="text"
            name="department"
            value={data?.department || ""}
            onChange={handleChange}
            placeholder="e.g. Engineering"
            className="w-full rounded-lg border p-3"
          />

        </div>


        {/* Job Code */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Job Code
          </label>

          <input
            type="text"
            name="jobCode"
            value={data?.jobCode || ""}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full rounded-lg border p-3"
          />

        </div>


      </div>
    </div>
  );
}