import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";

const AuditLogs = () => {
  const [search, setSearch] = useState("");

  const logs = [
    {
      id: 1,
      user: "Super Admin",
      action: "Created Admin",
      target: "John Doe",
      date: "16/07/2026",
      time: "09:30 AM",
      status: "Success",
    },
    {
      id: 2,
      user: "Admin",
      action: "Updated Job",
      target: "Software Engineer",
      date: "16/07/2026",
      time: "08:15 AM",
      status: "Success",
    },
    {
      id: 3,
      user: "Super Admin",
      action: "Deleted Blog",
      target: "Career Tips",
      date: "15/07/2026",
      time: "05:10 PM",
      status: "Success",
    },
    {
      id: 4,
      user: "Admin",
      action: "Login Attempt",
      target: "Admin Panel",
      date: "15/07/2026",
      time: "03:45 PM",
      status: "Failed",
    },
  ];

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <HistoryIcon fontSize="large" />
            Audit Logs
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor all important activities performed within the system.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          <DownloadIcon />
          Export Logs
        </button>

      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 justify-between mb-6">

        <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-96">
          <SearchIcon className="text-gray-500" />
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 outline-none w-full"
          />
        </div>

        <button className="flex items-center gap-2 bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300">
          <FilterListIcon />
          Filter
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Logs</h3>
          <p className="text-3xl font-bold mt-2">1,284</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Today's Activities</h3>
          <p className="text-3xl font-bold mt-2">56</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Successful</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">1,240</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Failed</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">44</p>
        </div>

      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">User</th>

              <th className="p-4 text-left">Action</th>

              <th className="p-4 text-left">Target</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Time</th>

              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {filteredLogs.map((log) => (

              <tr key={log.id} className="border-t hover:bg-gray-50">

                <td className="p-4">{log.user}</td>

                <td className="p-4">{log.action}</td>

                <td className="p-4">{log.target}</td>

                <td className="p-4">{log.date}</td>

                <td className="p-4">{log.time}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      log.status === "Success"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {log.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AuditLogs;