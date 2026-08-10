import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const monthlyUsers = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 240 },
  { month: "Apr", users: 320 },
  { month: "May", users: 420 },
  { month: "Jun", users: 550 },
];

const jobsData = [
  { month: "Jan", jobs: 30 },
  { month: "Feb", jobs: 45 },
  { month: "Mar", jobs: 60 },
  { month: "Apr", jobs: 75 },
  { month: "May", jobs: 90 },
  { month: "Jun", jobs: 110 },
];

const roleData = [
  { name: "Super Admin", value: 2 },
  { name: "Admin", value: 10 },
  { name: "Employee", value: 45 },
  { name: "Job Seekers", value: 250 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const Analytics = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Analytics Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Users</h3>
          <h1 className="text-3xl font-bold mt-2">307</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Jobs Posted</h3>
          <h1 className="text-3xl font-bold mt-2">110</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Applications</h3>
          <h1 className="text-3xl font-bold mt-2">1,285</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Companies</h3>
          <h1 className="text-3xl font-bold mt-2">36</h1>
        </div>

      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* User Growth */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">
            Monthly User Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyUsers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#2563EB" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Jobs */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Jobs Posted
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={jobsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#10B981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Pie Chart */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">

        <h2 className="text-xl font-semibold mb-4">
          User Distribution
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>

            <Pie
              data={roleData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {roleData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Analytics;