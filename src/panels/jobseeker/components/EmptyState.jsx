import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing Here",
  description = "There is no data to display.",
  buttonText,
  onButtonClick,
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center">
      <div className="rounded-full bg-blue-100 p-5">
        <Icon className="text-blue-600" size={40} />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        {description}
      </p>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}