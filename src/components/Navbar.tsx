"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Login", href: "/login" },
    { label: "Sign Up", href: "/signup" },
  ];

  return (
    <header className="bg-black border-b border-red-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
        {/* Brand */}
        <Link
          href="/"
          className="text-red-500 font-mono text-sm font-bold uppercase tracking-widest hover:text-red-400 transition-colors"
        >
          BrokenData
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-red-500 font-mono text-xs uppercase tracking-widest hover:text-red-300 transition-colors border border-transparent hover:border-red-700 px-2 py-1"
            >
              ▸ {link.label}
            </Link>
          ))}
          {/* Upload — golden accent tab */}
          <Link
            href="/upload"
            className="font-mono text-xs uppercase tracking-widest px-3 py-1 border transition-colors"
            style={{
              color: "#FFD700",
              borderColor: "#B8860B",
              textShadow: "0 0 6px #FFD70088",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#FFF176";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#FFD700";
              (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 10px #FFD700cc";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#FFD700";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#B8860B";
              (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 6px #FFD70088";
            }}
          >
            ▲ Upload
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-red-500 font-mono text-xs uppercase tracking-widest hover:text-red-300 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="sm:hidden border-t border-red-900 bg-black flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-red-500 font-mono text-xs uppercase tracking-widest hover:text-red-300 hover:bg-red-950 transition-colors px-6 py-3 border-b border-red-900"
            >
              ▸ {link.label}
            </Link>
          ))}
          {/* Upload — golden accent (mobile) */}
          <Link
            href="/upload"
            onClick={() => setOpen(false)}
            className="font-mono text-xs uppercase tracking-widest px-6 py-3 border-b border-yellow-900 transition-colors"
            style={{ color: "#FFD700" }}
          >
            ▲ Upload
          </Link>
        </nav>
      )}
    </header>
  );
}
