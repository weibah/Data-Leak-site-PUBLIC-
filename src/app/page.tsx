import { DatasetCard } from "@/components/DatasetCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  let freeData: any[] = [];
  let premiumData: any[] = [];
  let recentUploads: any[] = [];

  // Try to fetch from database if available
  try {
    const { db } = await import("@/db");
    if (db) {
      const { datasets } = await import("@/db/schema");
      const { eq, desc } = await import("drizzle-orm");
      
      const dbFreeData = await db.select().from(datasets).where(eq(datasets.tier, "free"));
      const dbPremiumData = await db.select().from(datasets).where(eq(datasets.tier, "premium"));
      const dbRecentUploads = await db.select().from(datasets).orderBy(desc(datasets.createdAt)).limit(25);

      freeData = dbFreeData;
      premiumData = dbPremiumData;
      recentUploads = dbRecentUploads;
    }
  } catch (error) {
    console.log("Database unavailable, using empty state");
    // Use empty arrays - no fallback data
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
 ██║  ██║██║   ██║   ██╔══██╔══██║
 ██████╔╝██║  ██║   ██║   ██║  ██║
 ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
`}
        </pre>
        <p className="text-green-600 text-xs font-mono mt-2 tracking-widest uppercase">
          raw data. real signals. no noise.
        </p>
        <div className="flex gap-6 mt-6 text-xs font-mono text-green-700">
          <span>▸ {freeData.length + premiumData.length} datasets</span>
          <span>▸ free & premium tiers</span>
          <span>▸ instant download</span>
        </div>
      </section>

      {/* Section anchors */}
      <div className="border-b border-green-900 px-6 py-3 flex gap-6 text-xs font-mono text-green-600">
        <a href="#recent" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">
          ▸ Recent Uploads
        </a>
        <a href="#free" className="hover:text-green-300 transition-colors uppercase tracking-widest">
          ▸ Free Data
        </a>
        <a href="#premium" className="hover:text-yellow-400 transition-colors uppercase tracking-widest">
          ▸ Premium Data
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-20">

        {/* Recent Uploads Board */}
        <section id="recent">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-500 text-lg">▸</span>
              <h2 className="text-cyan-300 font-mono text-xl font-bold uppercase tracking-widest">Recent Uploads</h2>
              <span className="border border-cyan-700 text-cyan-600 text-xs px-2 py-0.5 font-mono">
                latest {recentUploads.length}
              </span>
            </div>
            <p className="text-green-700 text-xs font-mono ml-6">
              The most recently added datasets to the marketplace.
            </p>
          </div>

          {recentUploads.length === 0 ? (
            <div className="border border-cyan-900 p-8 text-center text-cyan-800 font-mono text-sm">
              No datasets uploaded yet. Be the first to contribute.
            </div>
          ) : (
            <div className="border border-cyan-900 divide-y divide-cyan-900/50">
              {recentUploads.map((dataset, idx) => {
                const tags: string[] = (() => { try { return JSON.parse(dataset.tags); } catch { return []; } })();
                return (
                  <div key={dataset.id} className="flex items-center gap-4 px-4 py-3 hover:bg-cyan-950/20 transition-colors group">
                    {/* Index */}
                    <span className="text-cyan-800 font-mono text-xs w-6 shrink-0 text-right">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {/* Tier badge */}
                    <span className={`text-xs px-2 py-0.5 font-mono shrink-0 ${
                      dataset.tier === "free" 
                        ? "bg-green-900/30 text-green-400 border border-green-800" 
                        : "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                    }`}>
                      {dataset.tier.toUpperCase()}
                    </span>
                    {/* Title & Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-cyan-300 font-mono text-sm truncate group-hover:text-cyan-200">
                        {dataset.title}
                      </h3>
                      <p className="text-cyan-700 font-mono text-xs truncate">
                        {dataset.description}
                      </p>
                    </div>
                    {/* Tags */}
                    <div className="hidden md:flex gap-2 shrink-0">
                      {tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-cyan-800 font-mono text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {/* Record count */}
                    <span className="text-cyan-700 font-mono text-xs shrink-0">
                      {dataset.recordCount.toLocaleString()} rows
                    </span>
                    {/* Date */}
                    <span className="text-cyan-800 font-mono text-xs shrink-0">
                      {new Date(dataset.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Free Datasets */}
        <section id="free">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-green-500 text-lg">▸</span>
              <h2 className="text-green-300 font-mono text-xl font-bold uppercase tracking-widest">Free Datasets</h2>
              <span className="border border-green-700 text-green-600 text-xs px-2 py-0.5 font-mono">
                {freeData.length} available
              </span>
            </div>
            <p className="text-green-700 text-xs font-mono ml-6">
              Quality datasets available for instant download. No payment required.
            </p>
          </div>

          {freeData.length === 0 ? (
            <div className="border border-green-900 p-8 text-center text-green-800 font-mono text-sm">
              No free datasets available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeData.map(dataset => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          )}
        </section>

        {/* Premium Datasets */}
        <section id="premium">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-yellow-500 text-lg">▸</span>
              <h2 className="text-yellow-300 font-mono text-xl font-bold uppercase tracking-widest">Premium Datasets</h2>
              <span className="border border-yellow-700 text-yellow-600 text-xs px-2 py-0.5 font-mono">
                {premiumData.length} available
              </span>
            </div>
            <p className="text-green-700 text-xs font-mono ml-6">
              High-value datasets available for purchase. Unlock professional-grade data.
            </p>
          </div>

          {premiumData.length === 0 ? (
            <div className="border border-yellow-900 p-8 text-center text-yellow-800 font-mono text-sm">
              No premium datasets available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumData.map(dataset => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-green-900 px-4 py-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-green-800 font-mono text-xs">
            ▸ BrokenData — Raw data. Real signals. No noise. ▸
          </p>
        </div>
      </footer>
    </main>
  );
}
