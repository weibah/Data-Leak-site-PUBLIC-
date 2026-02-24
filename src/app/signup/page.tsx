"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirm) {
      setStatus("error");
      setErrorMsg("Passwords do not match.");
      return;
    }

    setStatus("loading");

    // Placeholder — no real auth yet
    setTimeout(() => {
      setStatus("error");
      setErrorMsg("Registration not yet implemented.");
    }, 800);
  }

  return (
    <main className="min-h-screen bg-black text-green-400" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] px-4 py-16">

        {/* Terminal window */}
        <div className="w-full max-w-md">
          <div className="border border-green-800 bg-black">
            {/* Title bar */}
            <div className="border-b border-green-900 px-4 py-2 flex items-center gap-2">
              <span className="text-green-800 text-xs font-mono">●</span>
              <span className="text-green-800 text-xs font-mono">●</span>
              <span className="text-green-800 text-xs font-mono">●</span>
              <span className="text-green-600 text-xs font-mono uppercase tracking-widest ml-2">
                brokendata — new account
              </span>
            </div>

            {/* Form body */}
            <div className="p-8">
              <div className="mb-8">
                <p className="text-green-500 text-xs font-mono uppercase tracking-widest mb-1">
                  ▸ Register Node
                </p>
                <p className="text-green-800 text-xs font-mono">
                  Create an account to access premium datasets and purchase history.
                </p>
              </div>

              {status === "success" ? (
                <div className="border border-green-700 bg-green-950/20 px-4 py-6 text-center">
                  <p className="text-green-400 text-xs font-mono uppercase tracking-widest mb-2">
                    ✓ Account created
                  </p>
                  <p className="text-green-700 text-xs font-mono mb-4">
                    Welcome to BrokenData.
                  </p>
                  <Link
                    href="/login"
                    className="text-green-500 text-xs font-mono uppercase tracking-widest hover:text-green-300 transition-colors underline underline-offset-2"
                  >
                    ▸ Proceed to login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-green-600 text-xs font-mono uppercase tracking-widest">
                      Email
                    </label>
                    <div className="flex items-center border border-green-900 focus-within:border-green-600 transition-colors">
                      <span className="text-green-700 text-xs font-mono px-3 py-2 border-r border-green-900 select-none">
                        &gt;
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="flex-1 bg-black text-green-400 text-xs font-mono px-3 py-2 outline-none placeholder:text-green-900"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1">
                    <label className="text-green-600 text-xs font-mono uppercase tracking-widest">
                      Password
                    </label>
                    <div className="flex items-center border border-green-900 focus-within:border-green-600 transition-colors">
                      <span className="text-green-700 text-xs font-mono px-3 py-2 border-r border-green-900 select-none">
                        &gt;
                      </span>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="min. 8 characters"
                        className="flex-1 bg-black text-green-400 text-xs font-mono px-3 py-2 outline-none placeholder:text-green-900"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1">
                    <label className="text-green-600 text-xs font-mono uppercase tracking-widest">
                      Confirm Password
                    </label>
                    <div className="flex items-center border border-green-900 focus-within:border-green-600 transition-colors">
                      <span className="text-green-700 text-xs font-mono px-3 py-2 border-r border-green-900 select-none">
                        &gt;
                      </span>
                      <input
                        type="password"
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="repeat password"
                        className="flex-1 bg-black text-green-400 text-xs font-mono px-3 py-2 outline-none placeholder:text-green-900"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div className="border border-red-900 bg-red-950/20 px-4 py-2 text-red-400 text-xs font-mono">
                      ✕ {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 border border-green-700 bg-black text-green-400 text-xs font-mono uppercase tracking-widest px-4 py-3 hover:bg-green-950 hover:border-green-500 hover:text-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "▸ Creating account..." : "▸ Create Account"}
                  </button>
                </form>
              )}

              {/* Footer links */}
              <div className="mt-8 pt-6 border-t border-green-900 flex flex-col gap-2 text-xs font-mono">
                <p className="text-green-800">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-600 hover:text-green-400 transition-colors underline underline-offset-2">
                    Login
                  </Link>
                </p>
                <p className="text-green-800">
                  <Link href="/" className="text-green-700 hover:text-green-500 transition-colors">
                    ← Back to marketplace
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="border border-t-0 border-green-900 px-4 py-1.5 flex justify-between text-green-900 text-xs font-mono">
            <span>brokendata.io</span>
            <span>secure connection</span>
          </div>
        </div>
      </div>
    </main>
  );
}
