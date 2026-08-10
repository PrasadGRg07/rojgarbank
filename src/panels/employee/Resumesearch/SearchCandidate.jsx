import React, { useState, useRef, useEffect, useMemo } from "react";
import SearchFilter from "./SearchFilter";
import api from "../../../lib/api";
import {
  Bell,
  X,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  GraduationCap,
  CreditCard,
  MapPin,
} from "lucide-react";

// ---- Mock data -------------------------------------------------------

const TRENDING = ["Front desk", "Accountant", "Counselor", "Web Developer"];

const SORT_OPTIONS = ["New Jobseekers", "Active Candidates", "Total Experience"];

const PAGE_SIZE = 10;

// ---- Small UI atoms ----------------------------------------------------

function Pill({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 whitespace-nowrap">
      {children}
    </span>
  );
}

function GradCapIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3Z" fill="currentColor" />
      <path
        d="M5 10.18v3.64c0 1.5 3.13 3.18 7 3.18s7-1.68 7-3.18v-3.64l-7 3.18-7-3.18Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function CardIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

// ---- Candidate card -------------------------------------------------------

import { useNavigate } from "react-router-dom";

function CandidateCard({ candidate }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 sm:px-6 py-5 sm:py-6 last:border-b-0">
      <div className="flex gap-3 sm:gap-4">
        {candidate.profile_picture ? (
          <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full bg-gray-200">
            <img src={candidate.profile_picture} alt={candidate.name} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl sm:text-2xl font-semibold text-white">
            {candidate.name ? candidate.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{candidate.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <GradCapIcon className="h-4 w-4" />
              {candidate.educations && candidate.educations.length > 0 ? candidate.educations[0].degree : "N/A"}
            </span>
            <span className="flex items-center gap-1.5">
              <PinIcon className="h-4 w-4" />
              {candidate.address || "N/A"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {candidate.skills && candidate.skills.slice(0, 4).map((skill) => (
              <Tag key={skill.id}>{skill.name}</Tag>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate(`/employee/dashboard/candidates/${candidate.user_id}`)}
        className="flex items-center justify-center gap-2 self-stretch sm:self-center rounded-md border-2 border-blue-500 px-6 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors whitespace-nowrap"
      >
        <Eye size={16} />
        View
      </button>
    </div>
  );
}

// ---- Pagination -------------------------------------------------------

function getPageNumbers(current, total) {
  const pages = [];
  const windowSize = 5;

  if (total <= windowSize + 2) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  if (current <= windowSize) {
    for (let i = 1; i <= windowSize + 1; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(total);
  } else if (current >= total - windowSize + 1) {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = total - windowSize; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(total);
  }
  return pages;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 overflow-x-auto px-4 py-2 sm:gap-1.5">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`min-w-[2.25rem] rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ---- Sort dropdown -------------------------------------------------------

function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-400"
      >
        Sort By
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-52 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                selected === opt ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Main page -------------------------------------------------------

export default function ResumeSearch() {
  const [candidates, setCandidates] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    salaryRange: "",
    educationLevel: "",
    drivingLicense: "",
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get("/employee/candidates/");
        setCandidates(response.data);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      }
    };
    fetchCandidates();
  }, []);

  const hasSearched = submittedKeyword !== null;

  // Client-side filter: matches keyword against name, education, location, tags
  const filteredCandidates = useMemo(() => {
    if (!submittedKeyword) return candidates;
    const q = submittedKeyword.toLowerCase();
    return candidates.filter((c) => {
      const haystack = [
        c.name, 
        c.address, 
        ...(c.skills?.map(s => s.name) || []),
        ...(c.educations?.map(e => e.degree) || [])
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [submittedKeyword, candidates]);

  const totalCount = filteredCandidates.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const rangeStart = totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, totalCount);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const runSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setKeyword(trimmed);
    setSubmittedKeyword(trimmed);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(keyword);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("resume-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex">
        <SearchFilter
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onApply={setFilters}
        />

        <main className="flex-1 min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-900">
            Premium Resume Search
          </h1>

          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Search by keywords
            </label>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-3 pl-9 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400"
                  placeholder="Enter keyword to find candidates"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Find Candidates
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 mr-1">Trending Searches</span>
              {TRENDING.map((t) => (
                <Pill key={t} active={submittedKeyword === t} onClick={() => runSearch(t)}>
                  {t}
                </Pill>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <SortDropdown />
          </div>

          <div
            id="resume-results"
            className="mt-6 rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            {totalCount === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 px-6 py-20 sm:py-24 text-center">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {submittedKeyword
                    ? `No candidates found for "${submittedKeyword}"`
                    : "No candidates available"}
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                  {submittedKeyword
                    ? "Try a different keyword or check the trending searches above."
                    : "There are currently no jobseekers registered in the system."}
                </p>
              </div>
            ) : (
              <>
                <p className="px-4 sm:px-6 pt-5 text-center text-sm font-semibold text-gray-700">
                  {submittedKeyword
                    ? `Showing ${totalCount} results for "${submittedKeyword}"`
                    : `Showing all ${totalCount} candidates`}
                </p>
                <div className="mt-4 divide-y divide-gray-100">
                  {paginatedCandidates.map((c) => (
                    <CandidateCard key={c.id} candidate={c} />
                  ))}
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:px-6">
                  <p className="text-sm text-gray-500">
                    Showing {rangeStart} to {rangeEnd} of {totalCount} entries.
                  </p>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}