import React, { useState } from "react";
import { X, ChevronDown, ChevronLeft } from "lucide-react";

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const EXPERIENCE_OPTIONS = ["Fresher", "1-2 Years", "2-5 Years", "5+ Years"];
const SALARY_OPTIONS = ["Below 20K", "20K-30K", "30K-40K", "40K-50K", "50K+"];
const EDUCATION_OPTIONS = ["Below SEE", "Intermediate", "Bachelors", "Masters", "PhD"];
const DRIVING_LICENSE_OPTIONS = ["Two Wheeler", "Four Wheeler", "Both", "None"];

const DEFAULT_FILTERS = {
  gender: "",
  experience: "",
  salaryRange: "",
  educationLevel: "",
  drivingLicense: "",
};

function Select({ label, placeholder, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 ${
            value ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-gray-900">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}

export default function SearchFilter({ open, onClose, onApply }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilter = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onApply?.(next);
  };

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    onApply?.(DEFAULT_FILTERS);
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto bg-white px-6 py-6 shadow-2xl transition-transform duration-300 ease-in-out
        lg:static lg:z-auto lg:w-[280px] lg:max-w-none lg:shrink-0 lg:border-r lg:border-gray-200 lg:shadow-none lg:transition-none
        ${open ? "translate-x-0" : "-translate-x-full lg:hidden"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
            <ChevronLeft size={20} className="text-gray-500 hidden lg:block" />
            Advanced Search
          </div>
          <button
            onClick={onClose}
            aria-label="Close advanced search"
            className="text-red-500 hover:text-red-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <Select
            label="Gender"
            placeholder="Select..."
            value={filters.gender}
            onChange={(v) => updateFilter("gender", v)}
            options={GENDER_OPTIONS}
          />
          <Select
            label="Experience"
            placeholder="Select..."
            value={filters.experience}
            onChange={(v) => updateFilter("experience", v)}
            options={EXPERIENCE_OPTIONS}
          />
          <Select
            label="Salary Range"
            placeholder="Select..."
            value={filters.salaryRange}
            onChange={(v) => updateFilter("salaryRange", v)}
            options={SALARY_OPTIONS}
          />
          <Select
            label="Education Level"
            placeholder="Select..."
            value={filters.educationLevel}
            onChange={(v) => updateFilter("educationLevel", v)}
            options={EDUCATION_OPTIONS}
          />
          <Select
            label="Driving License"
            placeholder="Select..."
            value={filters.drivingLicense}
            onChange={(v) => updateFilter("drivingLicense", v)}
            options={DRIVING_LICENSE_OPTIONS}
          />
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="mt-8 w-full rounded-md bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
        >
          Clear Filters
        </button>
      </aside>
    </>
  );
}