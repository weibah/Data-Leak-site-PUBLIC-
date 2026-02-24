import { db } from "@/db";
import { datasets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DatasetCard } from "@/components/DatasetCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  let freeData: typeof datasets.$inferSelect[] = [];
  let premiumData: typeof datasets.$inferSelect[] = [];

  try {
    freeData = await db.select().from(datasets).where(eq(datasets.tier, "free"));
    premiumData = await db.select().from(datasets).where(eq(datasets.tier, "premium"));
  } catch {
    // DB not yet migrated — show empty state
  }

  return (
    <main className="min-h-screen bg-black text-green-400" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
      {/* ASCII Art Hero */}
      <section className="border-b border-green-900 px-4 py-12 flex flex-col items-center">
        <pre className="text-green-400 text-xs sm:text-sm leading-tight select-none overflow-x-auto max-w-full text-center">
{`
 ██████╗ ██████╗  ██████╗ ██╗  ██╗███████╗███╗   ██╗
 ██╔══██╗██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝████╗  ██║
 ██████╔╝██████╔╝██║   ██║█████╔╝ █████╗  ██╔██╗ ██║
 ██╔══██╗██╔══██╗██║   ██║██╔═██╗ ██╔══╝  ██║╚██╗██║
 ██████╔╝██║  ██║╚██████╔╝██║  ██╗███████╗██║ ╚████║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝

 ██████╗  █████╗ ████████╗ █████╗
 ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
 ██║  ██║███████║   ██║   ███████║
 ██║  ██║██╔══██║   ██║   ██╔══██║
 ██████╔╝██║  ██║   ██║   ██║  ██║
 ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
`}
        </pre>
        <p className="text-green-600 text-xs font-mono mt-2 tracking-widest uppercase">
          raw data. real signals. no noise.
        </p>
        <div className="flex gap-6 mt-6 text-xs font-mono text-green-700">
          <span>▸ {freeData.length + premiumData.length} datasets</span>
          <span>▸ free &amp; premium tiers</span>
          <span>▸ instant download</span>
        </div>
      </section>

      {/* Nav anchors */}
      <nav className="border-b border-green-900 px-6 py-3 flex gap-6 text-xs font-mono text-green-600 sticky top-0 bg-black z-10">
        <a href="#free" className="hover:text-green-300 transition-colors uppercase tracking-widest">
          ▸ Free Data
        </a>
        <a href="#premium" className="hover:text-yellow-400 transition-colors uppercase tracking-widest">
          ▸ Premium Data
        </a>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-20">

        {/* Free Section */}
        <section id="free">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-green-500 text-lg">▸</span>
              <h2 className="text-green-300 font-mono text-xl font-bold uppercase tracking-widest">Free Data</h2>
              <span className="border border-green-700 text-green-600 text-xs px-2 py-0.5 font-mono">
                {freeData.length} datasets
              </span>
            </div>
            <p className="text-green-700 text-xs font-mono ml-6">
              No account required. Download immediately. Use however you want.
            </p>
          </div>

          {freeData.length === 0 ? (
            <div className="border border-green-900 p-8 text-center text-green-800 font-mono text-sm">
              No free datasets available yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freeData.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="border-t border-green-900 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 text-green-800 text-xs font-mono">
            ── PREMIUM ──
          </span>
        </div>

        {/* Premium Section */}
        <section id="premium">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-yellow-500 text-lg">▸</span>
              <h2 className="text-yellow-400 font-mono text-xl font-bold uppercase tracking-widest">Premium Data</h2>
              <span className="border border-yellow-700 text-yellow-600 text-xs px-2 py-0.5 font-mono">
                {premiumData.length} datasets
              </span>
            </div>
            <p className="text-green-700 text-xs font-mono ml-6">
              High-value, curated datasets. One-time purchase. Delivered to your inbox.
            </p>
          </div>

          {premiumData.length === 0 ? (
            <div className="border border-yellow-900 p-8 text-center text-yellow-800 font-mono text-sm">
              No premium datasets available yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {premiumData.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-green-900 px-6 py-6 text-center text-green-800 text-xs font-mono">
        <p>BrokenData © {new Date().getFullYear()} — data is broken, but at least it&apos;s honest.</p>
      </footer>
    </main>
  );
}
