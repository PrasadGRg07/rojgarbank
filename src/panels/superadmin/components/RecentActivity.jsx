import React from "react";

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">
          No recent activity found.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;