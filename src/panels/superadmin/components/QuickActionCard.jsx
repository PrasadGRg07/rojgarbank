import React from "react";

const QuickActionCard = ({ title, description, icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300 w-full text-left"
    >
      <div className="flex items-center gap-4">
        <div className={`${color} text-white p-4 rounded-full`}>
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;