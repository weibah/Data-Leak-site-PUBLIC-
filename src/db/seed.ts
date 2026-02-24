import { db } from "./index";
import { datasets } from "./schema";

const freeDatasets = [
  {
    title: "Global City Populations 2024",
    description: "Population data for the top 500 cities worldwide. Includes city name, country, continent, and population figures.",
    category: "Demographics",
    tier: "free" as const,
    price: null,
    previewData: JSON.stringify([
      { city: "Tokyo", country: "Japan", continent: "Asia", population: 13960000 },
      { city: "Delhi", country: "India", continent: "Asia", population: 32941000 },
      { city: "Shanghai", country: "China", continent: "Asia", population: 28516904 },
    ]),
    fullData: JSON.stringify([
      { city: "Tokyo", country: "Japan", continent: "Asia", population: 13960000 },
      { city: "Delhi", country: "India", continent: "Asia", population: 32941000 },
      { city: "Shanghai", country: "China", continent: "Asia", population: 28516904 },
      { city: "Dhaka", country: "Bangladesh", continent: "Asia", population: 23210000 },
      { city: "São Paulo", country: "Brazil", continent: "South America", population: 22430000 },
      { city: "Mexico City", country: "Mexico", continent: "North America", population: 22085140 },
      { city: "Cairo", country: "Egypt", continent: "Africa", population: 21750020 },
      { city: "Beijing", country: "China", continent: "Asia", population: 21893095 },
      { city: "Mumbai", country: "India", continent: "Asia", population: 20667656 },
      { city: "Osaka", country: "Japan", continent: "Asia", population: 19059856 },
    ]),
    recordCount: 500,
    tags: JSON.stringify(["cities", "population", "demographics", "geography"]),
  },
  {
    title: "Cryptocurrency Prices — Historical 2020–2024",
    description: "Daily open/close/high/low prices for the top 20 cryptocurrencies from 2020 to 2024.",
    category: "Finance",
    tier: "free" as const,
    price: null,
    previewData: JSON.stringify([
      { date: "2024-01-01", symbol: "BTC", open: 42258.0, close: 44168.0, high: 44729.0, low: 41884.0 },
      { date: "2024-01-01", symbol: "ETH", open: 2281.0, close: 2367.0, high: 2399.0, low: 2261.0 },
      { date: "2024-01-01", symbol: "SOL", open: 101.5, close: 105.2, high: 107.8, low: 99.3 },
    ]),
    fullData: JSON.stringify([
      { date: "2024-01-01", symbol: "BTC", open: 42258.0, close: 44168.0, high: 44729.0, low: 41884.0 },
      { date: "2024-01-01", symbol: "ETH", open: 2281.0, close: 2367.0, high: 2399.0, low: 2261.0 },
      { date: "2024-01-01", symbol: "SOL", open: 101.5, close: 105.2, high: 107.8, low: 99.3 },
      { date: "2024-01-02", symbol: "BTC", open: 44168.0, close: 45692.0, high: 46000.0, low: 43900.0 },
      { date: "2024-01-02", symbol: "ETH", open: 2367.0, close: 2450.0, high: 2480.0, low: 2340.0 },
    ]),
    recordCount: 36500,
    tags: JSON.stringify(["crypto", "bitcoin", "finance", "prices", "historical"]),
  },
  {
    title: "Open Source GitHub Repos — Top 1000",
    description: "Metadata for the top 1000 most-starred GitHub repositories including stars, forks, language, and description.",
    category: "Technology",
    tier: "free" as const,
    price: null,
    previewData: JSON.stringify([
      { repo: "freeCodeCamp/freeCodeCamp", stars: 402000, forks: 37200, language: "TypeScript" },
      { repo: "996icu/996.ICU", stars: 269000, forks: 21300, language: null },
      { repo: "EbookFoundation/free-programming-books", stars: 340000, forks: 61000, language: null },
    ]),
    fullData: JSON.stringify([
      { repo: "freeCodeCamp/freeCodeCamp", stars: 402000, forks: 37200, language: "TypeScript" },
      { repo: "996icu/996.ICU", stars: 269000, forks: 21300, language: null },
      { repo: "EbookFoundation/free-programming-books", stars: 340000, forks: 61000, language: null },
      { repo: "torvalds/linux", stars: 183000, forks: 54000, language: "C" },
      { repo: "jwasham/coding-interview-university", stars: 305000, forks: 77000, language: null },
    ]),
    recordCount: 1000,
    tags: JSON.stringify(["github", "open-source", "repositories", "technology"]),
  },
];

const premiumDatasets = [
  {
    title: "US Consumer Spending Patterns 2023",
    description: "Detailed consumer spending data across 50 categories for 10,000 anonymized US households. Includes income bracket, region, age group, and monthly spend.",
    category: "Economics",
    tier: "premium" as const,
    price: 49.99,
    previewData: JSON.stringify([
      { household_id: "HH001", income_bracket: "$75k-$100k", region: "Northeast", category: "Groceries", monthly_spend: 620 },
      { household_id: "HH002", income_bracket: "$50k-$75k", region: "South", category: "Groceries", monthly_spend: 480 },
      { household_id: "HH003", income_bracket: "$100k+", region: "West", category: "Dining Out", monthly_spend: 890 },
    ]),
    fullData: JSON.stringify({ note: "Full dataset available after purchase — 10,000 records across 50 categories" }),
    recordCount: 500000,
    tags: JSON.stringify(["consumer", "spending", "economics", "households", "USA"]),
  },
  {
    title: "Global Patent Filings 2010–2024",
    description: "Complete patent filing data from 40 countries including inventor names, assignees, IPC classifications, and citation counts.",
    category: "Intellectual Property",
    tier: "premium" as const,
    price: 129.99,
    previewData: JSON.stringify([
      { patent_id: "US11234567", title: "Neural network optimization method", assignee: "TechCorp Inc.", year: 2023, citations: 12 },
      { patent_id: "EP3456789", title: "Battery cell architecture", assignee: "EnergyLabs GmbH", year: 2022, citations: 34 },
      { patent_id: "CN202310001", title: "Semiconductor fabrication process", assignee: "SemiCo Ltd.", year: 2023, citations: 7 },
    ]),
    fullData: JSON.stringify({ note: "Full dataset available after purchase — 2.4M patent records" }),
    recordCount: 2400000,
    tags: JSON.stringify(["patents", "IP", "innovation", "technology", "global"]),
  },
  {
    title: "Social Media Sentiment — Fortune 500 Brands",
    description: "Aggregated sentiment scores from Twitter/X, Reddit, and news sources for all Fortune 500 companies. Daily granularity, 2022–2024.",
    category: "Marketing",
    tier: "premium" as const,
    price: 79.99,
    previewData: JSON.stringify([
      { brand: "Apple", date: "2024-01-15", platform: "Twitter", sentiment_score: 0.72, mention_count: 45200 },
      { brand: "Tesla", date: "2024-01-15", platform: "Reddit", sentiment_score: 0.41, mention_count: 12800 },
      { brand: "Amazon", date: "2024-01-15", platform: "News", sentiment_score: 0.58, mention_count: 8900 },
    ]),
    fullData: JSON.stringify({ note: "Full dataset available after purchase — 500 brands × 730 days × 3 platforms" }),
    recordCount: 1095000,
    tags: JSON.stringify(["sentiment", "social media", "brands", "marketing", "NLP"]),
  },
  {
    title: "Real Estate Transactions — 10 Major US Cities",
    description: "Property sale records for NYC, LA, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, and San Jose from 2018–2024.",
    category: "Real Estate",
    tier: "premium" as const,
    price: 99.99,
    previewData: JSON.stringify([
      { city: "New York", zip: "10001", sale_price: 1250000, sqft: 1100, bedrooms: 2, year_built: 1985, sold_date: "2024-01-10" },
      { city: "Los Angeles", zip: "90001", sale_price: 875000, sqft: 1450, bedrooms: 3, year_built: 1972, sold_date: "2024-01-08" },
      { city: "Chicago", zip: "60601", sale_price: 420000, sqft: 1800, bedrooms: 3, year_built: 1995, sold_date: "2024-01-12" },
    ]),
    fullData: JSON.stringify({ note: "Full dataset available after purchase — 1.2M property transactions" }),
    recordCount: 1200000,
    tags: JSON.stringify(["real estate", "property", "housing", "transactions", "USA"]),
  },
];

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(datasets);

  // Insert free datasets
  for (const dataset of freeDatasets) {
    await db.insert(datasets).values(dataset);
  }

  // Insert premium datasets
  for (const dataset of premiumDatasets) {
    await db.insert(datasets).values(dataset);
  }

  console.log(`Seeded ${freeDatasets.length} free datasets and ${premiumDatasets.length} premium datasets.`);
}

seed().catch(console.error);
