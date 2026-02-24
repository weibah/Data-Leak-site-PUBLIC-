"use client";

import { useState, useCallback } from "react";
import { DatasetCard } from "@/components/DatasetCard";

interface Dataset {
  id: number;
  title: string;
  description: string;
  category: string;
  tier: "free" | "premium";
  price: number | null;
  previewData: string;
  fullData: string;
  recordCount: number;
  tags: string;
  createdAt: Date | null;
}

const CATEGORIES = ["All", "Finance", "Health", "Social", "Science", "Technology", "Environment", "Demographics"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState("all");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<Dataset[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const runSearch = useCallback(
    async (q: string, t: string, cat: string) => {
      setLoading(true);
      setError("");
      setSearched(true);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (t !== "all") params.set("tier", t);
        if (cat && cat !== "All") params.set("category", cat);

        const res = await fetch(`/api/search?${params.toString()}`);
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setError("Search failed. Please try again.");
        setResults(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query, tier, category);
  };

  const handleTierChange = (newTier: string) => {
    setTier(newTier);
    if (searched) runSearch(query, newTier, category);
  };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    if (searched) runSearch(query, tier, newCat);
  };

  return (
    <main
      className="min-h-screen bg-black text-green-400"
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
    >
      {/* Page Header */}
      <section className="border-b border-green-900 px-4 py-10 flex flex-col items-center">
        <div className="text-green-500 text-xs tracking-widest uppercase mb-3">
          ▸ BrokenData / Search
        </div>
        <h1 className="text-green-300 font-mono text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-2">
          Search Datasets
        </h1>
        <p className="text-green-700 text-xs font-mono tracking-widest">
          query the archive. filter by tier. find your signal.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Search input */}
          <div className="flex gap-0">
            <span className="border border-r-0 border-green-700 bg-black text-green-600 text-xs font-mono px-3 flex items-center select-none">
              &gt;_
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search by title, tag, category..."
              className="flex-1 bg-black border border-green-700 text-green-300 text-sm font-mono px-4 py-3 outline-none focus:border-green-400 placeholder-green-800 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="border border-l-0 border-green-600 bg-black text-green-400 hover:bg-green-600 hover:text-black transition-colors text-xs font-mono px-5 py-3 uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Tier filter */}
            <div className="flex items-center gap-2">
              <span className="text-green-700 text-xs font-mono uppercase tracking-widest">Tier:</span>
              {["all", "free", "premium"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTierChange(t)}
                  className={`text-xs font-mono px-3 py-1 border uppercase tracking-widest transition-colors ${
                    tier === t
                      ? t === "premium"
                        ? "border-yellow-500 bg-yellow-500 text-black"
                        : "border-green-500 bg-green-500 text-black"
                      : "border-green-900 text-green-700 hover:border-green-600 hover:text-green-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-green-700 text-xs font-mono uppercase tracking-widest">Category:</span>
              {CATEGORIES.map((cat) => {
                const val = cat === "All" ? "" : cat;
                const active = category === val;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(val)}
                    className={`text-xs font-mono px-2 py-1 border uppercase tracking-widest transition-colors ${
                      active
                        ? "border-green-500 bg-green-500 text-black"
                        : "border-green-900 text-green-700 hover:border-green-600 hover:text-green-400"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Divider */}
        <div className="border-t border-green-900 relative">
          <span className="absolute -top-3 left-0 bg-black pr-4 text-green-800 text-xs font-mono">
            ── RESULTS ──
          </span>
        </div>

        {/* Results area */}
        {error && (
          <div className="border border-red-800 p-4 text-red-500 text-xs font-mono">
            ✕ {error}
          </div>
        )}

        {loading && (
          <div className="text-green-600 text-xs font-mono animate-pulse py-8 text-center">
            ▸ scanning archive...
          </div>
        )}

        {!loading && !searched && (
          <div className="text-center py-16 flex flex-col items-center gap-4">
            <pre className="text-green-900 text-xs leading-tight select-none">
{`  ╔══════════════════════════════╗
  ║  enter a query to begin...   ║
  ╚══════════════════════════════╝`}
            </pre>
            <p className="text-green-800 text-xs font-mono">
              search by keyword, filter by tier or category
            </p>
          </div>
        )}

        {!loading && searched && results !== null && results.length === 0 && (
          <div className="text-center py-16 flex flex-col items-center gap-4">
            <pre className="text-green-900 text-xs leading-tight select-none">
{`  ╔══════════════════════════════╗
  ║   no results found.          ║
  ╚══════════════════════════════╝`}
            </pre>
            <p className="text-green-800 text-xs font-mono">
              try a different query or remove filters
            </p>
          </div>
        )}

        {!loading && results && results.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-green-500 text-lg">▸</span>
              <span className="text-green-300 font-mono text-sm uppercase tracking-widest">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-green-900 px-6 py-6 text-center text-green-800 text-xs font-mono mt-12">
        <p>BrokenData © {new Date().getFullYear()} — data is broken, but at least it&apos;s honest.</p>
      </footer>
    </main>
  );
}
