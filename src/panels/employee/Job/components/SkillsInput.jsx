import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function SkillsInput({
  value = [],
  onChange,
  placeholder = "Add a skill...",
  maxSkills = 20,
}) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const skill = input.trim();

    if (!skill) return;

    // Prevent duplicates
    if (value.some((item) => item.toLowerCase() === skill.toLowerCase())) {
      setInput("");
      return;
    }

    if (value.length >= maxSkills) return;

    onChange([...value, skill]);
    setInput("");
  };

  const removeSkill = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }

    if (e.key === "Backspace" && input === "" && value.length) {
      removeSkill(value.length - 1);
    }
  };

  return (
    <div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* Skill Chips */}
      {value.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">

          {value.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="rounded-full p-1 hover:bg-blue-200"
              >
                <X size={14} />
              </button>

            </span>
          ))}

        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>Press Enter or "," to add a skill.</span>
        <span>
          {value.length}/{maxSkills} skills
        </span>
      </div>

    </div>
  );
}