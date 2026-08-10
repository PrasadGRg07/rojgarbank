import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Plus } from "lucide-react";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import TrainingStatistics from "./TrainingStatistics";
import TrainingTable from "./TrainingTable";

export default function TrainingList() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      <PageHeader
        title="Training Sessions"
        subtitle="Manage all training sessions"
      />

      <TrainingStatistics />

      <div className="bg-white rounded-xl shadow border p-5">

        {/* Search + Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <div className="w-full md:max-w-md">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search training..."
            />
          </div>

          <button
            onClick={() => navigate("/admin/dashboard/training/create")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            <Plus size={18} />
            <GraduationCap size={18} />
            Add Training
          </button>

        </div>

        <TrainingTable search={search} />

      </div>

    </div>
  );
}