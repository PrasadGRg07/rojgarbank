import React, { useEffect, useState } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../../lib/jobseekerApi";
import {
  Plus,
  X,
  Save,
  Code2,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    level: "",
  });

  const [editingId, setEditingId] = useState(null);

  const suggestions = [
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Bootstrap",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Git",
    "GitHub",
    "REST API",
    "Java",
    "Python",
    "Django",
    "Laravel",
    "Flutter",

    "Docker",
    "AWS",
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      setSkills(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Please enter a skill.");
      return;
    }

    try {
      if (editingId) {
        await updateSkill(editingId, form);
      } else {
        await createSkill(form);
      }

      setForm({
        name: "",
        level: "",
      });

      setEditingId(null);

      fetchSkills();
    } catch (err) {
      console.error(err);
      alert("Unable to save skill.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await deleteSkill(id);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setForm({
      name: skill.name,
      level: skill.level || "",
    });
  };

  const addSuggestion = (skill) => {
    setForm({
      name: skill,
      level: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Skills
        </h1>

        <p className="text-gray-500 mt-2">
          Add your professional skills.
        </p>
      </div>

      {/* Form */}

      <div className="bg-white rounded-2xl shadow-sm border p-8">

        <h2 className="text-xl font-semibold mb-6">
          {editingId ? "Edit Skill" : "Add Skill"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Skill Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="rounded-xl border px-4 py-3"
          />

          <select
            value={form.level}
            onChange={(e) =>
              setForm({
                ...form,
                level: e.target.value,
              })
            }
            className="rounded-xl border px-4 py-3 bg-white"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl"
          >
            <Save size={18} />
            {editingId ? "Update Skill" : "Save Skill"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  level: "",
                });
              }}
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* Skills */}

      <div className="bg-white rounded-2xl shadow-sm border p-8 mt-8">

        <h2 className="text-xl font-semibold mb-6">
          Your Skills
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : skills.length === 0 ? (
          <p className="text-gray-500">
            No skills found.
          </p>
        ) : (
          <div className="space-y-4">

            {skills.map((skill) => (

              <div
                key={skill.id}
                className="flex justify-between items-center rounded-xl border p-4"
              >

                <div className="flex items-center gap-3">

                  <Code2 className="text-cyan-600" />

                  <div>

                    <h3 className="font-semibold">
                      {skill.name}
                    </h3>

                    {skill.level && (
                      <span
                        className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                          skill.level === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : skill.level === "Intermediate"
                            ? "bg-blue-100 text-blue-700"
                            : skill.level === "Advanced"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {skill.level}
                      </span>
                    )}

                  </div>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Suggestions */}

      <div className="bg-white rounded-2xl shadow-sm border p-8 mt-8">

        <h2 className="text-xl font-semibold mb-6">
          Suggested Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {suggestions.map((skill) => (

            <button
              key={skill}
              onClick={() => addSuggestion(skill)}
              className="px-4 py-2 rounded-full border hover:bg-cyan-50 hover:border-cyan-500"
            >
              <Plus size={14} className="inline mr-1" />
              {skill}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}