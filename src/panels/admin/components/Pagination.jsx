import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}