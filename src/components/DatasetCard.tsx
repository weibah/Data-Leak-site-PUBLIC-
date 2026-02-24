"use client";

import { useState } from "react";

interface Dataset {
  id: number;
  title: string;
  description: string;
  category: string;
  tier: "free" | "premium";
  price: number | null;
  previewData: string;
  recordCount: number;
  tags: string;
}

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [email, setEmail] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [error, setError] = useState("");

  const tags: string[] = JSON.parse(dataset.tags);
  const preview = JSON.parse(dataset.previewData);

  const handlePurchase = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setPurchasing(true);
    setError("");
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datasetId: dataset.id, email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Purchase failed.");
      } else {
        setPurchased(true);
        setShowPurchase(false);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="border border-green-800 bg-black hover:border-green-500 transition-colors duration-200 p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs px-2 py-0.5 border font-mono uppercase tracking-widest ${
                dataset.tier === "free"
                  ? "border-green-600 text-green-400"
                  : "border-yellow-600 text-yellow-400"
              }`}
            >
              {dataset.tier === "free" ? "FREE" : `$${dataset.price?.toFixed(2)}`}
            </span>
            <span className="text-xs text-green-700 uppercase tracking-widest">{dataset.category}</span>
          </div>
          <h3 className="text-green-300 font-mono text-sm font-bold leading-snug">{dataset.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-green-600 text-xs leading-relaxed font-mono">{dataset.description}</p>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-green-700 font-mono">
        <span>▸ {dataset.recordCount.toLocaleString()} records</span>
        <span>▸ {tags.length} tags</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={tag} className="text-xs border border-green-900 text-green-700 px-2 py-0.5 font-mono">
            #{tag}
          </span>
        ))}
      </div>

      {/* Preview toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-green-500 hover:text-green-300 font-mono text-left transition-colors"
      >
        {expanded ? "▾ hide preview" : "▸ show preview"}
      </button>

      {expanded && (
        <div className="overflow-x-auto border border-green-900 bg-black">
          <table className="text-xs font-mono w-full">
            <thead>
              <tr className="border-b border-green-900">
                {Object.keys(preview[0] || {}).map((key) => (
                  <th key={key} className="text-left px-3 py-2 text-green-500 uppercase tracking-wider whitespace-nowrap">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row: Record<string, unknown>, i: number) => (
                <tr key={i} className="border-b border-green-950 hover:bg-green-950/20">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-3 py-2 text-green-400 whitespace-nowrap">
                      {val === null ? <span className="text-green-800">null</span> : String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-green-800 text-xs px-3 py-2 font-mono">
            showing {preview.length} of {dataset.recordCount.toLocaleString()} records
          </p>
        </div>
      )}

      {/* Action */}
      {dataset.tier === "free" ? (
        <a
          href={`/api/download/${dataset.id}`}
          className="mt-auto border border-green-600 text-green-400 hover:bg-green-600 hover:text-black transition-colors text-xs font-mono px-4 py-2 text-center uppercase tracking-widest"
        >
          ▸ Download Free
        </a>
      ) : purchased ? (
        <div className="mt-auto border border-green-600 text-green-400 text-xs font-mono px-4 py-2 text-center uppercase tracking-widest">
          ✓ Purchase Recorded — Check Your Email
        </div>
      ) : showPurchase ? (
        <div className="mt-auto flex flex-col gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-green-700 text-green-300 text-xs font-mono px-3 py-2 outline-none focus:border-green-400 placeholder-green-800"
          />
          {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handlePurchase}
              disabled={purchasing}
              className="flex-1 border border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black transition-colors text-xs font-mono px-4 py-2 uppercase tracking-widest disabled:opacity-50"
            >
              {purchasing ? "Processing..." : `▸ Confirm $${dataset.price?.toFixed(2)}`}
            </button>
            <button
              onClick={() => { setShowPurchase(false); setError(""); }}
              className="border border-green-900 text-green-700 hover:text-green-400 text-xs font-mono px-3 py-2"
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowPurchase(true)}
          className="mt-auto border border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black transition-colors text-xs font-mono px-4 py-2 text-center uppercase tracking-widest"
        >
          ▸ Purchase — ${dataset.price?.toFixed(2)}
        </button>
      )}
    </div>
  );
}
