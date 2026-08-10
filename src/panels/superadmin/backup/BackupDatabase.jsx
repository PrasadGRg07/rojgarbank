import React from "react";
import BackupIcon from "@mui/icons-material/Backup";
import DownloadIcon from "@mui/icons-material/Download";
import RestoreIcon from "@mui/icons-material/Restore";
import StorageIcon from "@mui/icons-material/Storage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BackupDatabase = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Database Backup
        </h1>
        <p className="text-gray-500 mt-2">
          Manage database backups and restore previous backups.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <StorageIcon className="text-blue-600 text-4xl mb-3" />
          <h2 className="text-gray-500">Database Size</h2>
          <p className="text-2xl font-bold mt-2">4.8 GB</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <BackupIcon className="text-green-600 text-4xl mb-3" />
          <h2 className="text-gray-500">Last Backup</h2>
          <p className="text-2xl font-bold mt-2">Today</p>
          <small className="text-gray-500">02:00 AM</small>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <CheckCircleIcon className="text-green-600 text-4xl mb-3" />
          <h2 className="text-gray-500">Backup Status</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">
            Successful
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <StorageIcon className="text-purple-600 text-4xl mb-3" />
          <h2 className="text-gray-500">Total Backups</h2>
          <p className="text-2xl font-bold mt-2">18</p>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-5">
          Backup Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            <BackupIcon />
            Backup Now
          </button>

          <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            <DownloadIcon />
            Download Backup
          </button>

          <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
            <RestoreIcon />
            Restore Backup
          </button>

        </div>

      </div>

      {/* Backup History */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">
            Backup History
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Time</th>

              <th className="p-4 text-left">Size</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">
              <td className="p-4">16/07/2026</td>
              <td className="p-4">02:00 AM</td>
              <td className="p-4">4.8 GB</td>
              <td className="p-4 text-green-600 font-semibold">
                Successful
              </td>
              <td className="p-4 text-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Download
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">15/07/2026</td>
              <td className="p-4">02:00 AM</td>
              <td className="p-4">4.7 GB</td>
              <td className="p-4 text-green-600 font-semibold">
                Successful
              </td>
              <td className="p-4 text-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Download
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">14/07/2026</td>
              <td className="p-4">02:00 AM</td>
              <td className="p-4">4.7 GB</td>
              <td className="p-4 text-green-600 font-semibold">
                Successful
              </td>
              <td className="p-4 text-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Download
                </button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default BackupDatabase;