import React from "react";
import CandidateCard from "./CandidateCard";

const stageColors = {
  applied: "bg-blue-100 text-blue-700",
  screening: "bg-yellow-100 text-yellow-700",
  interview: "bg-purple-100 text-purple-700",
  offer: "bg-green-100 text-green-700",
  hired: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const PipelineColumn = ({ title, stage, candidates }) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 min-w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">{title}</h2>

        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            stageColors[stage]
          }`}
        >
          {candidates.length}
        </span>
      </div>

      {/* Candidate List */}
      <div className="space-y-3">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 text-sm py-10 border-2 border-dashed border-gray-300 rounded-xl">
            No candidates
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineColumn;