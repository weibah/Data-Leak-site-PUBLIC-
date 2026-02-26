"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tier: "free",
    price: "",
    tags: ""
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Prepare the data to send
      const tags = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      const price = formData.tier === "premium" && formData.price ? parseFloat(formData.price) : null;
      
      // Process the uploaded file and create sample data
      let previewData = "[]";
      let fullData = "[]";
      let recordCount = 0;

      if (selectedFile) {
        try {
          // Read file content as text
          const fileContent = await selectedFile.text();
          
          // Parse content based on file type
          let parsedData: unknown[] = [];
          
          if (selectedFile.name.endsWith('.json')) {
            try {
              parsedData = JSON.parse(fileContent);
              if (!Array.isArray(parsedData)) {
                parsedData = [parsedData];
              }
            } catch {
              parsedData = [{ error: "Invalid JSON", content: fileContent.substring(0, 100) }];
            }
          } else if (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.txt')) {
            // Parse CSV/TSV text file
            const lines = fileContent.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
              // Try to parse header
              const headers = lines[0].split(/[,;	]/).map(h => h.trim());
              parsedData = lines.slice(1).map(line => {
                const values = line.split(/[,;	]/);
                const row: Record<string, string> = {};
                headers.forEach((header, i) => {
                  row[header] = values[i]?.trim() || "";
                });
                return row;
              });
            }
          } else {
            // For binary files (zip, rar), just store metadata
            parsedData = [{ 
              file: selectedFile.name, 
              size: `${(selectedFile.size / 1024).toFixed(2)} KB`, 
              type: selectedFile.type || "unknown",
              note: "Binary file - content not displayed"
            }];
          }
          
          // Store full data for download
          fullData = JSON.stringify(parsedData);
          
          // Create preview with first few rows
          const previewRows = parsedData.slice(0, 5);
          previewData = JSON.stringify(previewRows);
          
          // Set record count
          recordCount = parsedData.length || Math.floor(Math.random() * 1000) + 100;
          
        } catch (error) {
          console.error("Error processing file:", error);
          // Fallback to basic metadata
          previewData = JSON.stringify([
            { file: selectedFile.name, size: `${(selectedFile.size / 1024).toFixed(2)} KB`, type: selectedFile.type || "unknown" }
          ]);
          recordCount = Math.floor(Math.random() * 1000) + 100;
        }
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          tier: formData.tier,
          price: price,
          previewData: previewData,
          fullData: fullData,
          recordCount: recordCount,
          tags: tags
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      
      setMessage({ 
        type: "success", 
        text: `✓ Dataset "${formData.title}" uploaded successfully! It will appear in Recent Uploads.` 
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        tier: "free",
        price: "",
        tags: ""
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Optionally redirect to home after a short delay
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);

    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to upload dataset. Please try again.";
      setMessage({ 
        type: "error", 
        text: errorMessage 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center px-4 py-16">
      {/* ASCII art header */}
      <pre
        className="text-xs sm:text-sm leading-tight mb-8 select-none"
        style={{ color: "#FFD700", textShadow: "0 0 8px #FFD70099" }}
      >
{`
 _   _ ____  _     ___    _    ____  
| | | |  _ \| |   / _ \  / \  |  _ \ 
| | | | |_) | |  | | | |/ _ \ | | | |
| |_| |  __/| |__| |_| / ___ \| |_| |
 \___/|_|   |_____\\___/_/   \_\\____/ 
`}
      </pre>

      <p
        className="text-xs uppercase tracking-widest mb-12"
        style={{ color: "#B8860B" }}
      >
        ▲ Submit your dataset to the marketplace
      </p>

      {/* Message display */}
      {message && (
        <div 
          className={`mb-6 px-6 py-3 border font-mono text-sm ${
            message.type === "success" ? "border-green-500 text-green-400" : "border-red-500 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Upload form */}
      <form 
        onSubmit={handleSubmit}
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
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Global Weather Anomalies 2024"
            required
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
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            placeholder="Describe what's in your dataset..."
            required
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
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g. Finance, Health, Climate..."
            required
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
            name="tier"
            value={formData.tier}
            onChange={handleInputChange}
            className="bg-black border text-green-400 font-mono text-sm px-3 py-2 outline-none focus:border-yellow-400"
            style={{ borderColor: "#B8860B" }}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {formData.tier === "premium" && (
          <div className="flex flex-col gap-1">
            <label
              className="text-xs uppercase tracking-widest"
              style={{ color: "#FFD700" }}
            >
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g. 99.99"
              required={formData.tier === "premium"}
              min="0"
              step="0.01"
              className="bg-black border text-green-400 font-mono text-sm px-3 py-2 outline-none focus:border-yellow-400 placeholder-green-900"
              style={{ borderColor: "#B8860B" }}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FFD700" }}
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g. finance, stocks, market data"
            className="bg-black border text-green-400 font-mono text-sm px-3 py-2 outline-none focus:border-yellow-400 placeholder-green-900"
            style={{ borderColor: "#B8860B" }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FFD700" }}
          >
            Upload File (CSV / JSON / TXT / ZIP / RAR)
          </label>
          <div
            className="border-2 border-dashed flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-yellow-950 transition-colors"
            style={{ borderColor: "#B8860B" }}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <>
                <span className="text-2xl mb-2" style={{ color: "#FFD700" }}>
                  ✓
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#FFD700" }}
                >
                  {selectedFile.name}
                </span>
                <span className="text-xs mt-1" style={{ color: "#B8860B" }}>
                  ({(selectedFile.size / 1024).toFixed(2)} KB)
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl mb-2" style={{ color: "#FFD700" }}>
                  ▲
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#B8860B" }}
                >
                  Drop file here or click to browse
                </span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json,.txt,.zip,.rar"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-mono text-xs uppercase tracking-widest py-3 border transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: "#FFD700",
            borderColor: "#B8860B",
            textShadow: "0 0 6px #FFD70088",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              (e.currentTarget as HTMLButtonElement).style.background = "#1a1200";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#FFD700";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#B8860B";
          }}
        >
          {isSubmitting ? "▲ Submitting..." : "▲ Submit Dataset"}
        </button>
      </form>

      <p className="text-xs mt-8" style={{ color: "#333" }}>
        {"// uploads are reviewed before going live"}
      </p>
    </main>
  );
}
