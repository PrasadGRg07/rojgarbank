import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Users,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getEmployees } from "@/lib/adminApi";

export default function EmployerList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load employee data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filtered = employees.filter(
    (e) =>
      (e.username || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.company || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employers</h1>
          <p className="text-gray-500 mt-1">
            All registered employer accounts on the platform.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchEmployees}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3 shadow-sm">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="text-blue-600 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Employers</p>
            <p className="text-2xl font-bold">{employees.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3 shadow-sm">
          <div className="bg-green-100 p-2 rounded-lg">
            <Briefcase className="text-green-600 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold">
              {employees.filter((e) => e.is_active).length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3 shadow-sm">
          <div className="bg-red-100 p-2 rounded-lg">
            <AlertCircle className="text-red-500 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Inactive</p>
            <p className="text-2xl font-bold">
              {employees.filter((e) => !e.is_active).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <Input
          placeholder="Search by name, email or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow">
        {loading ? (
          <div className="py-16 text-center text-gray-400">
            <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-3 text-gray-300" />
            Loading employees...
          </div>
        ) : error ? (
          <div className="py-16 text-center text-red-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Users className="h-10 w-10 mx-auto mb-3 text-gray-200" />
            No employers found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-gray-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Company</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Jobs Posted</th>
                <th className="px-6 py-4 text-left">Joined</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, idx) => (
                <tr
                  key={emp.id}
                  className="border-t hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-400">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium">{emp.username || "—"}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Mail className="h-3.5 w-3.5" />
                      {emp.email || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Building2 className="h-3.5 w-3.5" />
                      {emp.company || <span className="text-gray-300 italic">No company</span>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Phone className="h-3.5 w-3.5" />
                      {emp.phone || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                      <span className="font-semibold">{emp.job_count ?? 0}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {emp.date_joined || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge
                      className={
                        emp.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {emp.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelected(emp)}
                    >
                      <Eye className="mr-1.5 h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-full h-14 w-14 flex items-center justify-center text-2xl font-bold text-blue-600">
                {(selected.username || "?")[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{selected.username}</h2>
                <p className="text-gray-500 text-sm">{selected.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Company</p>
                <p className="font-medium">{selected.company || "—"}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Phone</p>
                <p className="font-medium">{selected.phone || "—"}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Jobs Posted</p>
                <p className="font-bold text-blue-600">{selected.job_count ?? 0}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Joined</p>
                <p className="font-medium">{selected.date_joined || "—"}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 col-span-2">
                <p className="text-gray-400 text-xs mb-1">Account Status</p>
                <Badge
                  className={
                    selected.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {selected.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}