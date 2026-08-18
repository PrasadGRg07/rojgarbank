import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShieldIcon from "@mui/icons-material/Shield";
import { getSuperAdminUsers, grantSpecialAccount, revokeSpecialAccount } from "../../../lib/superadminApi";

const roleBadgeColor = {
  employee: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
  jobseeker: "bg-green-100 text-green-700",
  superadmin: "bg-red-100 text-red-700",
};

const SpecialAccounts = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // user id being acted on
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getSuperAdminUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleGrant = async () => {
    if (!selectedUser) return;
    setActionLoading("grant");
    try {
      const result = await grantSpecialAccount(selectedUser);
      setUsers(prev =>
        prev.map(u => u.id === Number(selectedUser) ? { ...u, is_special_account: true } : u)
      );
      setSelectedUser("");
      showMessage("success", result.message);
    } catch (err) {
      showMessage("error", "Failed to grant special access.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevoke = async (userId, username) => {
    if (!window.confirm(`Revoke special account access from ${username}?`)) return;
    setActionLoading(userId);
    try {
      const result = await revokeSpecialAccount(userId);
      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, is_special_account: false } : u)
      );
      showMessage("success", result.message);
    } catch (err) {
      showMessage("error", "Failed to revoke special access.");
    } finally {
      setActionLoading(null);
    }
  };

  const specialAccounts = users.filter(u => u.is_special_account);
  const eligibleUsers = users.filter(u => !u.is_special_account);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShieldIcon fontSize="large" className="text-indigo-600" />
            Special Accounts
          </h1>
          <p className="text-gray-500 mt-1">
            Grant or revoke unlimited access to users — their original role is never changed.
          </p>
        </div>
        <div className="bg-indigo-100 text-indigo-700 rounded-xl px-5 py-3 text-center">
          <div className="text-2xl font-bold">{specialAccounts.length}</div>
          <div className="text-sm">Active Special Accounts</div>
        </div>
      </div>

      {/* Toast Message */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg font-medium transition-all ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* Grant Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
          <StarIcon className="text-yellow-500" />
          Grant Special Account
        </h2>
        <p className="text-gray-500 mb-5 text-sm">
          The user keeps their original role (e.g. Employee). Only their special access flag is toggled.
        </p>

        <div className="flex gap-4 items-center flex-wrap">
          <select
            className="border rounded-lg p-3 flex-1 min-w-64 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Select a user to grant access --</option>
            {eligibleUsers.map(u => (
              <option key={u.id} value={u.id}>
                {u.username} · {u.email} · Role: {u.role}
              </option>
            ))}
          </select>

          <button
            onClick={handleGrant}
            disabled={!selectedUser || actionLoading === "grant"}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 font-semibold transition"
          >
            <StarIcon fontSize="small" />
            {actionLoading === "grant" ? "Granting..." : "Grant Special Access"}
          </button>
        </div>
      </div>

      {/* Active Special Accounts Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <StarIcon className="text-yellow-500" />
            Active Special Accounts
            <span className="ml-2 bg-indigo-100 text-indigo-700 text-sm px-2 py-0.5 rounded-full font-medium">
              {specialAccounts.length}
            </span>
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">User</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Original Role</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Special Account</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Date Joined</th>
              <th className="p-4 text-center text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">Loading users...</td>
              </tr>
            ) : specialAccounts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">
                  <StarBorderIcon className="text-gray-300 mb-2" fontSize="large" />
                  <div>No special accounts yet. Use the form above to grant access.</div>
                </td>
              </tr>
            ) : (
              specialAccounts.map(user => (
                <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold text-gray-800">{user.username}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${roleBadgeColor[user.role] || 'bg-gray-100 text-gray-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <StarIcon fontSize="small" />
                      YES
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{user.date_joined}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleRevoke(user.id, user.username)}
                      disabled={actionLoading === user.id}
                      className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white border border-red-300 px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
                    >
                      {actionLoading === user.id ? "Revoking..." : "Revoke"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialAccounts;
