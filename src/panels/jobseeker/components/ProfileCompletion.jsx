import { CheckCircle2, Circle } from "lucide-react";

export default function ProfileCompletion() {
  const completion = 75;

  const tasks = [
    { title: "Personal Information", completed: true },
    { title: "Upload Resume", completed: true },
    { title: "Add Education", completed: true },
    { title: "Add Experience", completed: false },
    { title: "Add Skills", completed:false },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Completion
          </h2>

          <p className="text-sm text-gray-500">
            Complete your profile to increase your chances of getting hired.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
          {completion}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-blue-600 transition-all"
          style={{ width: `${completion}%` }}
        />
      </div>

      {/* Tasks */}
      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2
                  className="text-green-500"
                  size={20}
                />
              ) : (
                <Circle
                  className="text-gray-400"
                  size={20}
                />
              )}

              <span
                className={
                  task.completed
                    ? "text-gray-700"
                    : "text-gray-500"
                }
              >
                {task.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
        Complete Profile
      </button>
    </div>
  );
}