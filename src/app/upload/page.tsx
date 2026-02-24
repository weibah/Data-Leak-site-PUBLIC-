"use client";

import { useRef } from "react";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center px-4 py-16">
      {/* ASCII art header */}
      <pre
        className="text-xs sm:text-sm leading-tight mb-8 select-none"
        style={{ color: "#FFD700", textShadow: "0 0 8px #FFD70099" }}
      >
{`
 _   _ ____  _     ___    _    ____  
| | | |  _ \\| |   / _ \\  / \\  |  _ \\ 
| | | | |_) | |  | | | |/ _ \\ | | | |
| |_| |  __/| |__| |_| / ___ \\| |_| |
 \\___/|_|   |_____\\___/_/   \\_\\____/ 
`}
      </pre>

      <p
        className="text-xs uppercase tracking-widest mb-12"
        style={{ color: "#B8860B" }}
      >
        ▲ Submit your dataset to the marketplace
      </p>

      {/* Upload form */}
      <div
        className="w-full max-w-lg border p-8 flex flex-col gap-6"
        style={{ borderColor: "#B8860B" }}
      >
        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FFD700" }}
          >
            Dataset Title
          </label>
          <input
            type="text"
            placeholder="e.g. Global Weather Anomalies 2024"
            className="bg-black border text-green-400 font-mono text-sm px-3 py-2 outline-none focus:border-yellow-400 placeholder-green-900"
            style={{ borderColor: "#B8860B" }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FFD700" }}
          >
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Describe what's in your dataset..."
            className="bg-black border text-green-400 font-mono text-sm px-3 py-2 outline-none focus:border-yellow-400 placeholder-green-900 resize-none"
            style={{ borderColor: "#B8860B" }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FFD700" }}
          >
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Finance, Health, Climate..."
            className="bg-black border text-green-400 font-mono text-sm px-3 py-2 outline-none focus:border-yellow-400 placeholder-green-900"
            style={{ borderColor: "#B8860B" }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FFD700" }}
          >
            Tier
          </label>
          <select
            className="bg-black border text-green-400 font-mono text-sm px-3 py-2 outline-none focus:border-yellow-400"
            style={{ borderColor: "#B8860B" }}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FFD700" }}
          >
            Upload File (CSV / JSON)
          </label>
          <div
            className="border-2 border-dashed flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-yellow-950 transition-colors"
            style={{ borderColor: "#B8860B" }}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-2xl mb-2" style={{ color: "#FFD700" }}>
              ▲
            </span>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#B8860B" }}
            >
              Drop file here or click to browse
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              className="hidden"
            />
          </div>
        </div>

        <button
          className="font-mono text-xs uppercase tracking-widest py-3 border transition-colors mt-2"
          style={{
            color: "#FFD700",
            borderColor: "#B8860B",
            textShadow: "0 0 6px #FFD70088",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#1a1200";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#FFD700";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#B8860B";
          }}
        >
          ▲ Submit Dataset
        </button>
      </div>

      <p className="text-xs mt-8" style={{ color: "#333" }}>
        {"// uploads are reviewed before going live"}
      </p>
    </main>
  );
}
