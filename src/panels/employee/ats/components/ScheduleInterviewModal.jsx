import React from "react";
import { X } from "lucide-react";

const ScheduleInterviewModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold">
            Schedule Interview
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Candidate
            </label>

            <select className="w-full border rounded-lg px-4 py-3">
              <option>John Doe</option>
              <option>Emma Brown</option>
              <option>David Wilson</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Job Position
            </label>

            <select className="w-full border rounded-lg px-4 py-3">
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>UI/UX Designer</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                Date
              </label>

              <input
                type="date"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Time
              </label>

              <input
                type="time"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                Interview Type
              </label>

              <select className="w-full border rounded-lg px-4 py-3">
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Interviewer
              </label>

              <input
                type="text"
                placeholder="HR Manager"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Meeting Link
            </label>

            <input
              type="text"
              placeholder="https://meet.google.com/..."
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Notes
            </label>

            <textarea
              rows={4}
              placeholder="Add interview notes..."
              className="w-full border rounded-lg px-4 py-3 resize-none"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Schedule Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;