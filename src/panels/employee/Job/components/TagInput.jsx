import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function TagInput({
  label,
  value = [],
  onChange,
  placeholder = "Type and press Enter...",
  maxTags = 15,
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim();

    if (!tag) return;

    if (value.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      setInput("");
      return;
    }

    if (value.length >= maxTags) return;

    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }

    if (e.key === "Backspace" && input === "" && value.length) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={addTag}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-3 text-white hover:bg-slate-900"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(index)}
                className="rounded-full p-1 hover:bg-slate-200"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>Press Enter or "," to add.</span>
        <span>
          {value.length}/{maxTags}
        </span>
      </div>
    </div>
  );
}