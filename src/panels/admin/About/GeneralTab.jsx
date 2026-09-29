import { useState } from "react";

import { updateAboutPage } from "../../../lib/aboutApi";
import FormField from "./FormField";
import { GENERAL_SECTIONS } from "./aboutConfig";

/**
 * Editor for the singleton About page row: hero copy and every section heading.
 *
 * The parent renders this with a changing `key` whenever the server payload
 * changes, so local form state is seeded once and stays in sync implicitly.
 */
export default function GeneralTab({ page, onChanged }) {
  const [form, setForm] = useState(page);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const setField = (name, value) => {
    setSaved(false);
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {};
    GENERAL_SECTIONS.forEach((section) => {
      if (section.toggle) payload[section.toggle] = Boolean(form[section.toggle]);
      section.fields.forEach((field) => {
        payload[field.name] = form[field.name] ?? "";
      });
    });

    try {
      setSaving(true);
      setError("");
      await updateAboutPage(payload);
      await onChanged();
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError("Could not save the About page. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Headings and long-form copy. Hide any section with its toggle.
        </p>

        <div className="flex shrink-0 items-center gap-3">
          {saved && (
            <span className="text-sm font-medium text-emerald-600">Saved</span>
          )}
          {error && <span className="text-sm font-medium text-red-600">{error}</span>}
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {GENERAL_SECTIONS.map((section) => (
        <div
          key={section.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">{section.title}</h3>
              {section.blurb && (
                <p className="mt-0.5 text-sm text-gray-500">{section.blurb}</p>
              )}
            </div>

            {section.toggle && (
              <FormField
                field={{
                  name: section.toggle,
                  label: section.toggle === "show_intro" ? "Show" : "Show section",
                  type: "checkbox",
                }}
                value={form[section.toggle]}
                onChange={(value) => setField(section.toggle, value)}
              />
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {section.fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "richtext" ? "md:col-span-2" : ""}
              >
                <FormField
                  field={field}
                  value={form[field.name]}
                  onChange={(value) => setField(field.name, value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
