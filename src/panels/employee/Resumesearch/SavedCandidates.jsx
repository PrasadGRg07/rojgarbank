import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { User, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function SavedCandidates() {
  const navigate = useNavigate();
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedCandidates();
  }, []);

  const fetchSavedCandidates = async () => {
    try {
      setLoading(true);
      const response = await api.get("/employee/saved-candidates/");
      setSavedCandidates(response.data);
    } catch (error) {
      console.error("Failed to fetch saved candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = async (candidateId) => {
    try {
      await api.post(`/employee/saved-candidates/${candidateId}/toggle/`);
      // Refresh list
      fetchSavedCandidates();
    } catch (error) {
      console.error("Failed to toggle saved candidate:", error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading saved candidates...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Saved Candidates
      </h1>

      {savedCandidates.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-gray-500">
            No saved candidates found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedCandidates.map((item) => {
            const candidate = item.candidate;
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md border border-slate-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        candidate.profile_picture ||
                        `https://ui-avatars.com/api/?name=${candidate.name}&background=e2e8f0`
                      }
                      alt={candidate.name}
                      className="h-16 w-16 rounded-full object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {candidate.name}
                      </h3>
                      {candidate.address && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                          <MapPin size={14} />
                          <span>{candidate.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {candidate.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail size={16} className="text-slate-400" />
                      <span className="truncate">{candidate.email}</span>
                    </div>
                  )}
                  {candidate.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={16} className="text-slate-400" />
                      <span>{candidate.phone}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => navigate(`/employee/dashboard/candidates/${candidate.user_id}`)}
                    className="flex-1 rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleToggleSave(candidate.user_id)}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
