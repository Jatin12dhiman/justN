"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SrchBox() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Type");

  const handleSearch = (e) => {
    e.preventDefault();

    // create search query string
    const query = new URLSearchParams({
      keyword,
      status,
      type,
    }).toString();

    // navigate to /search page with query params
    router.push(`/search?${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-4 md:items-center"
    >
      {/* Keyword */}
      <div className="relative">
        <label className="block text-xs font-medium text-neutral-400 mb-1">
          Keyword
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 pl-10 pr-3 py-2.5 text-sm outline-none focus:border-emerald-400"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Status */}
      <div className="md:border-l md:border-neutral-200 md:pl-6">
        <label className="block text-xs font-medium text-neutral-400 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-400"
        >
          <option>All Status</option>
          <option>For Rent</option>
          <option>For Sale</option>
        </select>
      </div>

      {/* Type */}
      <div className="md:border-l md:border-neutral-200 md:pl-6">
        <label className="block text-xs font-medium text-neutral-400 mb-1">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-400"
        >
          <option>All Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Studio</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-end justify-end gap-2">
        <button
          type="submit"
          className="rounded-xl bg-[#E7C873] px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-amber-500"
        >
          Search
        </button>
      </div>
    </form>
  );
}
