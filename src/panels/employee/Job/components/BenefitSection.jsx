import TagInput from "./TagInput";

const BENEFITS = [
  "Health Insurance",
  "Life Insurance",
  "Provident Fund",
  "Gratuity",
  "Festival Bonus",
  "Performance Bonus",
  "Annual Bonus",
  "Paid Leave",
  "Flexible Hours",
  "Remote Work",
  "Hybrid Work",
  "Training & Development",
  "Free Lunch",
  "Transportation",
  "Accommodation",
  "Fuel Allowance",
  "Mobile Allowance",
  "Internet Allowance",
  "Overtime Pay",
  "Employee Discounts",
];

export default function BenefitSection({
  data,
  onChange,
}) {
  const selectedBenefits = data.benefits || [];

  const toggleBenefit = (benefit) => {
    if (selectedBenefits.includes(benefit)) {
      onChange({
        benefits: selectedBenefits.filter((item) => item !== benefit),
      });
    } else {
      onChange({
        benefits: [...selectedBenefits, benefit],
      });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Benefits & Perks
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Highlight the benefits employees will receive.
        </p>
      </div>

      {/* Common Benefits */}

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          Common Benefits
        </h3>

        <div className="flex flex-wrap gap-3">

          {BENEFITS.map((benefit) => {
            const active = selectedBenefits.includes(benefit);

            return (
              <button
                key={benefit}
                type="button"
                onClick={() => toggleBenefit(benefit)}
                className={`rounded-full border px-4 py-2 text-sm transition
                  ${
                    active
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-500"
                  }`}
              >
                {benefit}
              </button>
            );
          })}

        </div>
      </div>

      {/* Custom Benefits */}

      <div className="mb-6">
        <TagInput
          label="Additional Benefits"
          value={selectedBenefits}
          onChange={(benefits) => onChange({ benefits })}
          placeholder="e.g. Stock Options"
        />
      </div>

      {/* Notes */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Additional Information
        </label>

        <textarea
          rows={4}
          name="otherBenefits"
          value={data.otherBenefits}
          onChange={(e) =>
            onChange({
              otherBenefits: e.target.value,
            })
          }
          placeholder="Describe additional benefits, company culture, career growth opportunities, etc."
          className="w-full rounded-xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
        />
      </div>

    </div>
  );
}