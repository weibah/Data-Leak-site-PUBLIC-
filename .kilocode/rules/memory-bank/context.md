# Active Context: BrokenData Marketplace

## Current State

**App Status**: ✅ BrokenData data marketplace — live and deployed

Full-featured data marketplace with black/terminal aesthetic, ASCII art hero, free dataset downloads, and premium dataset purchase flow backed by SQLite via Drizzle ORM.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] **BrokenData marketplace** — full implementation:
  - ASCII art "BrokenData" hero on black background
  - Green terminal / hacker aesthetic throughout
  - Free datasets section (3 sample datasets)
  - Premium datasets section (4 sample datasets, with pricing)
  - DatasetCard component with expandable data preview table
  - Download API for free datasets (`/api/download/[id]`)
  - Purchase API for premium datasets (`/api/purchase`)
  - Seed API to populate DB (`/api/seed`)
  - Drizzle ORM + SQLite database with `datasets` and `purchases` tables
- [x] **Red navigation menu** — sticky top navbar with Home, Search, Login, Sign Up links in red terminal style; mobile hamburger included
- [x] **Search page** — `/search` route with keyword search input, tier filter (all/free/premium), results grid using DatasetCard; backed by `/api/search` GET endpoint with SQLite LIKE queries (category filter removed)
- [x] **Login page** — `/login` route with terminal-style form (email + password), green/black aesthetic, placeholder auth flow
- [x] **Signup page** — `/signup` route with terminal-style form (email + password + confirm), green/black aesthetic, password match validation, placeholder registration flow
- [x] **Upload tab** — golden `▲ Upload` nav link after Sign Up; `/upload` page with ASCII "UPLOAD" hero, gold/black aesthetic, dataset submission form (title, description, category, tier, file drop zone)
- [x] **Recent Uploads board** — cyan-themed leaderboard-style list on home page showing the 25 most recently added datasets (index, tier badge, title, description, tags, row count, date); appears above the Free/Premium sections with its own nav anchor

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page with ASCII hero + dataset grid | ✅ Ready |
| `src/app/layout.tsx` | Root layout — black bg, mono font | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/components/DatasetCard.tsx` | Dataset card with preview + purchase/download | ✅ Ready |
| `src/app/api/download/[id]/route.ts` | Free dataset download endpoint | ✅ Ready |
| `src/app/api/purchase/route.ts` | Premium dataset purchase endpoint | ✅ Ready |
| `src/app/api/seed/route.ts` | DB seed endpoint (POST to populate) | ✅ Ready |
| `src/db/schema.ts` | Drizzle schema: datasets + purchases | ✅ Ready |
| `src/db/index.ts` | DB client | ✅ Ready |
| `src/db/migrate.ts` | Migration runner | ✅ Ready |
| `src/db/seed.ts` | CLI seed script | ✅ Ready |
| `drizzle.config.ts` | Drizzle Kit config | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Database Schema

### `datasets` table
- `id`, `title`, `description`, `category`
- `tier` — "free" | "premium"
- `price` — null for free, number for premium
- `previewData` — JSON string (3 sample rows shown in UI)
- `fullData` — JSON string (full data for free; note for premium)
- `recordCount`, `tags` (JSON array), `createdAt`

### `purchases` table
- `id`, `datasetId` (FK), `buyerEmail`, `amount`, `purchasedAt`

## Seeding

After migrations run automatically in sandbox, call `POST /api/seed` once to populate datasets.

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-02-24 | BrokenData marketplace built — ASCII hero, free/premium datasets, purchase flow, DB |
| 2026-02-24 | Added Recent Uploads board (top 25 by createdAt desc) to home page |
