import {
  EXPERIENCE_LEVELS,
  EDUCATION_LEVELS,
  LICENSE_OPTIONS,
  VEHICLE_OPTIONS,
  GENDER_OPTIONS,
} from "../utils/constants";

import SkillsInput from "./SkillsInput";

export default function RequirementSection({
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
          Requirements
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Define the qualifications and requirements for this position.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Experience */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Experience Level *
          </label>

          <select
            name="experience"
            value={data.experience}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Experience</option>

            {EXPERIENCE_LEVELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experience}
            </p>
          )}
        </div>

        {/* Education */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Education Level *
          </label>

          <select
            name="education"
            value={data.education}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Education</option>

            {EDUCATION_LEVELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {errors.education && (
            <p className="mt-1 text-sm text-red-500">
              {errors.education}
            </p>
          )}
        </div>

        {/* Skills */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Required Skills *
          </label>

          <SkillsInput
  value={data.skills}
  onChange={(skills) => onChange({ skills })}
/>

          {errors.skills && (
            <p className="mt-1 text-sm text-red-500">
              {errors.skills}
            </p>
          )}
        </div>

        {/* Languages */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Languages
          </label>

          <input
            type="text"
            name="languages"
            value={data.languages}
            onChange={handleChange}
            placeholder="e.g. English, Nepali"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* License */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Driving License
          </label>

          <select
            name="license"
            value={data.license}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="">Select License</option>

            {LICENSE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Vehicle Requirement
          </label>

          <select
            name="vehicle"
            value={data.vehicle}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="">Select Vehicle</option>

            {VEHICLE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Gender Preference
          </label>

          <select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="">Select Gender</option>

            {GENDER_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Age */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Minimum Age
          </label>

          <input
            type="number"
            name="minAge"
            value={data.minAge}
            onChange={handleChange}
            min={18}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        {/* Maximum Age */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Maximum Age
          </label>

          <input
            type="number"
            name="maxAge"
            value={data.maxAge}
            onChange={handleChange}
            min={18}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

      </div>
    </div>
  );
}