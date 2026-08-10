import { Search, X, SlidersHorizontal } from "lucide-react";

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
    onFilter,
    onClear,
    onSearch,
}) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative flex-1">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-11 outline-none transition focus:border-blue-500"
                />

                {value && (
                    <button
                        onClick={onClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <button
                onClick={onSearch}
                className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
                Search
            </button>

            <button
                onClick={onFilter}
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 transition hover:bg-gray-100"
            >
                <SlidersHorizontal size={18} />
                <span className="hidden md:inline">
                    Filters
                </span>
            </button>
        </div>
    );
}