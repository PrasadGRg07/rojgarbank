import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AnalyticsCard({
  title,
  description,
  icon: Icon,
  path,
  gradient,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="
        group
        cursor-pointer
        rounded-2xl
        bg-white
        p-6
        shadow-sm
        border
        border-gray-100
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* Icon */}
      <div
        className={`
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-xl
          text-white
          ${gradient}
          transition-transform
          duration-300
          group-hover:scale-110
        `}
      >
        <Icon size={28} />
      </div>


      {/* Content */}
      <div className="mt-5">

        <h2
          className="
            text-lg
            font-semibold
            text-gray-800
          "
        >
          {title}
        </h2>


        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-gray-500
          "
        >
          {description}
        </p>


      </div>



      {/* Footer */}
      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          text-sm
          font-medium
          text-blue-600
        "
      >

        <span>
          View Analytics
        </span>


        <ArrowRight
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />

      </div>


    </div>
  );
}