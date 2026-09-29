import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

/**
 * Renders one field from a config in `aboutConfig.js`.
 *
 * Text-ish fields are controlled inputs; `richtext` fields get the same Quill
 * editor the blog/event screens use; `image` fields are file inputs that report
 * the raw File so the caller can decide what to append to FormData.
 */
export default function FormField({
  field,
  value,
  onChange,
  imagePreview,
}) {
  const label = (
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {field.label}
      {field.required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  const help = field.help && (
    <p className="mt-1.5 text-xs text-gray-500">{field.help}</p>
  );

  if (field.type === "richtext") {
    return (
      <div>
        {label}
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <ReactQuill
            theme="snow"
            value={value || ""}
            onChange={onChange}
            modules={quillModules}
            placeholder={field.placeholder}
          />
        </div>
        {help}
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div>
        {label}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-blue-700"
        />
        {imagePreview && (
          <div className="mt-3 flex items-center gap-4">
            <img
              src={imagePreview}
              alt="Current"
              className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
            />
            <span className="text-xs text-gray-500">Current image</span>
          </div>
        )}
        {help}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {label}
        <textarea
          rows={field.rows || 3}
          value={value || ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} resize-y`}
        />
        {help}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        {field.checkboxLabel || field.label}
      </label>
    );
  }

  return (
    <div>
      {label}
      <input
        type="text"
        value={value || ""}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      {help}
    </div>
  );
}
