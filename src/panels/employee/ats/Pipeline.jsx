import React, { useState } from "react";
import { Search, Briefcase } from "lucide-react";

import PipelineColumn from "./components/PipelineColumn";
import { pipelineData } from "./data";

const Pipeline = () => {
  const [search, setSearch] = useState("");

  const filterCandidates = (candidates) => {
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.email.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            ATS Pipeline
          </h1>
          <p className="text-gray-500 mt-1">
            Manage candidates through every hiring stage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Job Select */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <select className="outline-none bg-transparent">
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>UI/UX Designer</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search candidate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="flex gap-5 overflow-x-auto pb-6">
        <PipelineColumn
          title="Applied"
          stage="applied"
          candidates={filterCandidates(pipelineData.applied)}
        />

        <PipelineColumn
          title="Screening"
          stage="screening"
          candidates={filterCandidates(pipelineData.screening)}
        />

        <PipelineColumn
          title="Interview"
          stage="interview"
          candidates={filterCandidates(pipelineData.interview)}
        />

        <PipelineColumn
          title="Offer"
          stage="offer"
          candidates={filterCandidates(pipelineData.offer)}
        />

        <PipelineColumn
          title="Hired"
          stage="hired"
          candidates={filterCandidates(pipelineData.hired)}
        />

        <PipelineColumn
          title="Rejected"
          stage="rejected"
          candidates={filterCandidates(pipelineData.rejected)}
        />
      </div>
    </div>
  );
};

export default Pipeline;