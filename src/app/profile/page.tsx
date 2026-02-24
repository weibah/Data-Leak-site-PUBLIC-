"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, clearSession, type Session } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  // Read session once on mount via lazy initializer (avoids setState-in-effect lint error)
  const [session] = useState<Session | null>(() => getSession());

  // Redirect to login if no session (effect only calls router, no setState)
  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  // Derive loading: if session is null we're redirecting, show spinner
  const loading = !session;

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-green-400 flex items-center justify-center font-mono text-xs">
        <span className="animate-pulse">▸ Loading session...</span>
      </main>
    );
  }

  const joinDate = session
    ? new Date(session.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main
      className="min-h-screen bg-black text-green-400"
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
    >
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] px-4 py-16">
        <div className="w-full max-w-lg">
          {/* Terminal window */}
          <div className="border border-green-800 bg-black">
            {/* Title bar */}
            <div className="border-b border-green-900 px-4 py-2 flex items-center gap-2">
              <span className="text-green-800 text-xs font-mono">●</span>
              <span className="text-green-800 text-xs font-mono">●</span>
              <span className="text-green-800 text-xs font-mono">●</span>
              <span className="text-green-600 text-xs font-mono uppercase tracking-widest ml-2">
                brokendata — profile
              </span>
            </div>

            {/* Body */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <p className="text-green-500 text-xs font-mono uppercase tracking-widest mb-1">
                  ▸ User Profile
                </p>
                <p className="text-green-800 text-xs font-mono">
                  Authenticated session active.
                </p>
              </div>

              {/* Profile info */}
              <div className="flex flex-col gap-4 mb-8">
                {/* Avatar placeholder */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 border border-green-700 flex items-center justify-center text-green-500 text-2xl select-none">
                    ◈
                  </div>
                  <div>
                    <p className="text-green-400 text-sm font-mono font-bold">
                      {session?.email}
                    </p>
                    <p className="text-green-800 text-xs font-mono mt-0.5">
                      Member since {joinDate}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: "Downloads", value: "0" },
                    { label: "Purchases", value: "0" },
                    { label: "Uploads", value: "0" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="border border-green-900 px-3 py-3 text-center"
                    >
                      <p className="text-green-400 text-lg font-mono font-bold">
                        {stat.value}
                      </p>
                      <p className="text-green-800 text-xs font-mono uppercase tracking-widest mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/upload"
                  className="border border-yellow-900 text-center text-xs font-mono uppercase tracking-widest px-4 py-3 transition-colors hover:border-yellow-600 hover:bg-yellow-950/20"
                  style={{ color: "#FFD700" }}
                >
                  ▲ Upload a Dataset
                </Link>
                <Link
                  href="/search"
                  className="border border-green-800 text-green-500 text-center text-xs font-mono uppercase tracking-widest px-4 py-3 hover:bg-green-950 hover:border-green-600 hover:text-green-300 transition-colors"
                >
                  ▸ Browse Datasets
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-red-900 text-red-500 text-xs font-mono uppercase tracking-widest px-4 py-3 hover:bg-red-950/30 hover:border-red-700 hover:text-red-400 transition-colors"
                >
                  ✕ Logout
                </button>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="border border-t-0 border-green-900 px-4 py-1.5 flex justify-between text-green-900 text-xs font-mono">
            <span>brokendata.to</span>
            <span>session active</span>
          </div>
        </div>
      </div>
    </main>
  );
}
