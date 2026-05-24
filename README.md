#  Trust RAG — Frontend Dashboard

**A clean, minimal Next.js 16 App Router dashboard for interacting with the Trust RAG semantic retrieval backend — featuring URL ingestion, vector search, and live store monitoring.**

---

##  Overview

**Trust RAG Frontend** is a three-page Next.js application that provides a developer-facing UI for the [Trust Scraper backend](../trust-scraper). It covers the full RAG workflow loop:

1. **Ingest** — Submit a URL to trigger the backend scraping, chunking, embedding, and vector storage pipeline
2. **Retrieve** — Run a natural language query against the in-memory vector store and inspect ranked semantic results with similarity scores
3. **Monitor** — Load a live snapshot of the vector store state: total vectors, chunk breakdown, embedding model details, and retrieval system status

All API responses are rendered as **pretty-printed, syntax-highlighted JSON** directly in the UI — making it straightforward to inspect raw retrieval output, embedding metadata, trust scores, and chunk structures during development and evaluation.

The app uses the **Next.js App Router** with `'use client'` directives, React 19, Tailwind CSS v4, and Axios for all HTTP calls to the backend running at `http://localhost:3000`.

---

##  Features

| Feature | Description |
|---|---|
|  **URL Ingestion UI** | Input field + Scrape button triggers full backend pipeline |
|  **Semantic Search UI** | Natural language query → cosine similarity retrieval |
|  **Live Stats Monitor** | Auto-fetches vector store snapshot on page mount |
|  **JSON Visualization** | All API responses rendered as styled, readable `<pre>` blocks |
|  **Shared Navbar** | Persistent navigation between Ingestion / Search / Stats |
|  **Loading States** | Button text transitions ("Processing..." / "Searching...") |
|  **Dark Mode Ready** | CSS variables in `globals.css` support `prefers-color-scheme` |
|  **Geist Font** | Google's Geist Sans + Geist Mono loaded via `next/font/google` |
|  **Path Aliases** | `@/*` aliased to `./src/*` via `jsconfig.json` |

---

## UI Screens

### Ingestion Page (`/`)

> Submit any public blog, PubMed, or YouTube URL. The backend processes it through the full pipeline and returns the complete JSON payload — chunks, embeddings, trust score, topic tags, and metadata.

```
┌─────────────────────────────────────────────────────────────────┐
│  Trust RAG          Ingestion    Search    Stats                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Trust RAG System                                               │
│                                                                 │
│  Multi-source AI retrieval backend with semantic vector         │
│  search, chunking, metadata enrichment, and hallucination       │
│  evaluation.                                                    │
│                                                                 │
│  ┌───────────────────────────────────────────────┐  ┌────────┐  │
│  │  Enter article/blog/PubMed URL...             │  │ Scrape │  │
│  └───────────────────────────────────────────────┘  └────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ JSON Output                          Retrieval Metadata │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ {                                                       │    │
│  │   "source_url": "...",                                  │    │
│  │   "trust_score": 0.8,                                   │    │
│  │   "topic_tags": [...],                                  │    │
│  │   "content_chunks": [...],                              │    │
│  │   "embedding_objects": [...]                            │    │
│  │ }                                                       │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

### Semantic Search Page (`/search`)

> Query the populated vector store. Results include ranked chunks with similarity scores and full retrieval metadata.

```
┌─────────────────────────────────────────────────────────────────┐
│  Trust RAG          Ingestion    Search    Stats                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Semantic Vector Search                                         │
│                                                                 │
│  Query the vector store using semantic similarity retrieval.    │
│                                                                 │
│  ┌──────────────────────────────────────────────┐  ┌────────┐   │
│  │  Search semantic chunks...                   │  │ Search │   │
│  └──────────────────────────────────────────────┘  └────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Retrieval Results                       JSON Response   │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ {                                                       │    │
│  │   "query": "how does RAG work",                         │    │
│  │   "retrieved_chunks": [                                 │    │
│  │     { "text": "...", "similarity_score": 0.891 }        │    │
│  │   ],                                                    │    │
│  │   "retrieval_count": 5                                  │    │
│  │ }                                                       │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

### Stats Page (`/stats`)

> Loads automatically on mount. Shows the live in-memory vector store state: total vectors, chunk type breakdown, embedding model, and retrieval system configuration.

```
┌─────────────────────────────────────────────────────────────────┐
│  Trust RAG          Ingestion    Search    Stats                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Semantic Retrieval Stats                                       │
│                                                                 │
│  Monitor vector counts, embedding statistics,                   │
│  and retrieval system metadata.                                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Vector Store Statistics          Live Retrieval Metrics │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ {                                                       │   │
│  │   "vector_store_type": "In-Memory Vector Store",        │   │
│  │   "total_vectors": 42,                                  │   │
│  │   "embedding_model": "Xenova all-MiniLM-L6-v2",         │   │
│  │   "embedding_dimensions": 384,                          │   │
│  │   "retrieval_system": "Semantic Cosine Similarity"      │   │
│  │ }                                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

###  Deployment Link 

-- https://ragapptask.netlify.app/


---

##  Frontend Architecture

```
Next.js 16 App Router
        │
        ▼
┌───────────────────────────────────────────┐
│              Root Layout                  │
│  layout.js — Geist font vars, body flex   │
│  globals.css — Tailwind v4 import,        │
│               CSS custom properties,      │
│               dark mode media query       │
└──────────────────┬────────────────────────┘
                   │
      ┌────────────┼───────────────┐
      ▼            ▼               ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  page.js │  │ search/  │  │  stats/  │
│ (/)      │  │ page.js  │  │ page.js  │
│          │  │ (/search)│  │ (/stats) │
│ 'use     │  │ 'use     │  │ 'use     │
│ client'  │  │ client'  │  │ client'  │
│          │  │          │  │          │
│ useState │  │ useState │  │ useState │
│ + axios  │  │ + axios  │  │ useEffect│
│ POST     │  │ POST     │  │ + axios  │
│ /scrape  │  │ /retrieve│  │ GET      │
│          │  │          │  │ /stats   │
└────┬─────┘  └────┬─────┘  └────┬─────┘
     │              │              │
     └──────────────▼──────────────┘
              ┌──────────┐
              │  Navbar  │
              │ (shared  │
              │component)│
              │ Link ×3  │
              └──────────┘
                   │
                   ▼
         Backend API (localhost:3000)
         POST /api/scrape
         POST /api/retrieve
         GET  /api/stats
```

The app is entirely **client-rendered** at the page level — all three pages carry `'use client'` directives and manage their own state locally with `useState`. No server actions, no `getServerSideProps`, no global state library. This keeps the data-fetching model simple and transparent for a developer tool.

---

##  Folder Structure

```
trust-frontend/
├── src/
│   ├── app/
│   │   ├── layout.js           # Root layout — Geist fonts, global CSS, body wrapper
│   │   ├── globals.css         # Tailwind v4 import, CSS variables, dark mode support
│   │   ├── favicon.ico
│   │   │
│   │   ├── page.js             # Route: /  — Ingestion page
│   │   │
│   │   ├── search/
│   │   │   └── page.js         # Route: /search — Semantic retrieval page
│   │   │
│   │   └── stats/
│   │       └── page.js         # Route: /stats — Vector store monitor page
│   │
│   └── components/
│       └── Navbar.js           # Shared navigation — Trust RAG / Ingestion / Search / Stats
│
├── public/                     # Static assets (SVGs, future screenshots)
├── jsconfig.json               # Path alias: @/* → ./src/*
├── postcss.config.mjs          # @tailwindcss/postcss plugin
├── eslint.config.mjs           # ESLint with eslint-config-next
├── package.json
└── package-lock.json
```

---

##  Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 16.2.6 | App Router, file-based routing, layout system |
| **React** | 19.2.4 | UI rendering, `useState`, `useEffect` |
| **Tailwind CSS** | v4 | Utility-first styling throughout |
| **@tailwindcss/postcss** | v4 | PostCSS integration for Tailwind v4 |
| **Axios** | 1.x | HTTP client for all backend API calls |
| **Geist / Geist Mono** | latest | Fonts loaded via `next/font/google` |
| **ESLint** | 9.x + next config | Linting |

---

##  Pages Overview

### `/` — Ingestion Page (`src/app/page.js`)

The landing page of the dashboard. Its role is to trigger the full backend ingestion pipeline and surface the raw JSON output.

**State:**
- `url` — controlled input value (the URL to scrape)
- `result` — stores the full Axios response payload from `POST /api/scrape`
- `loading` — boolean toggling the button label between `"Scrape"` and `"Processing..."`

**Behaviour:**
- User types or pastes a URL into the large rounded input
- Clicking **Scrape** fires `handleScrape()`, which `POST`s to `http://localhost:3000/api/scrape` with `{ url }`
- On success, the full response object is stored in `result` and rendered in the JSON panel
- On error, an `alert()` surfaces the backend's `message` field or the Axios error message

**Output panel:** A white rounded card with a header row ("JSON Output" / "Retrieval Metadata") and a `<pre>` block rendering the full response with `JSON.stringify(result, null, 2)` in orange monospace.

---

### `/search` — Semantic Search Page (`src/app/search/page.js`)

The retrieval interface. Sends a free-text query to the backend vector search endpoint and displays the ranked chunk results.

**State:**
- `query` — controlled input value (the natural language search query)
- `results` — stores the Axios response from `POST /api/retrieve`
- `loading` — toggles button label between `"Search"` and `"Searching..."`

**Behaviour:**
- User types a semantic query (e.g., _"how does attention mechanism work"_)
- Clicking **Search** fires `handleSearch()`, which `POST`s to `http://localhost:3000/api/retrieve` with `{ query }`
- The backend generates a query embedding, runs cosine similarity over all stored vectors, and returns ranked chunks
- Results — including `similarity_score`, `text`, and `metadata` per chunk — are rendered in the JSON panel

**Output panel:** Identical card structure to the ingestion page — header "Retrieval Results" / "JSON Response", orange-tinted `<pre>` block.

---

### `/stats` — Stats Monitor Page (`src/app/stats/page.js`)

A live monitoring view that auto-fetches vector store state on mount — no user interaction required.

**State:**
- `stats` — stores the Axios response from `GET /api/stats`

**Behaviour:**
- `useEffect` with an empty dependency array fires `fetchStats()` once on component mount
- `GET http://localhost:3000/api/stats` is called immediately when the page loads
- The response — including `total_vectors`, `parent_chunks`, `child_chunks`, `embedding_model`, `embedding_dimensions`, `retrieval_system`, and `status` — is rendered in the JSON panel
- No refresh button; reload the page to re-fetch

**Output panel:** Header "Vector Store Statistics" / "Live Retrieval Metrics".

---

##  Semantic Retrieval UI

The search page is the primary interface for evaluating RAG retrieval quality. The workflow it enables:

```
1. Ingest one or more URLs via the Ingestion page
         │
         ▼
2. Navigate to /search
         │
         ▼
3. Type a natural language question into the search input
         │
         ▼
4. Click Search → POST /api/retrieve { query }
         │
         ▼
5. Backend: query embedding → cosine similarity → top-K ranking
         │
         ▼
6. JSON panel renders ranked chunks with similarity_score per result
         │
         ▼
7. Developer inspects which chunks were retrieved and how confidently
```

The output JSON makes it easy to inspect:
- Whether the right chunks were retrieved (`text` field)
- How confident the retrieval was (`similarity_score`)
- Which source the chunk came from (`metadata.source_type`, `metadata.domain`)
- When the content was ingested (`metadata.ingestion_timestamp`)

---

##  JSON Visualization

All three pages share the same response display pattern: a white rounded card (`rounded-2xl shadow-md`) with a two-column header and a `<pre>` block styled with:

```css
text-sm text-orange-600 leading-7 overflow-x-auto
```

The orange-on-white treatment makes embedding vectors, similarity scores, and nested metadata objects immediately scannable. `JSON.stringify(data, null, 2)` provides consistently indented output with two-space nesting.

This approach is intentionally developer-first — the raw JSON is the UI, giving complete visibility into what the backend returns without any data loss from custom rendering components.

---

## 🔌 API Integration

All HTTP calls are made with **Axios** directly inside page-level async handler functions. There is no shared API client module — each page imports Axios and calls its endpoint independently.

| Page | Method | Endpoint | Trigger |
|---|---|---|---|
| Ingestion (`/`) | `POST` | `http://localhost:3000/api/scrape` | Button click |
| Search (`/search`) | `POST` | `http://localhost:3000/api/retrieve` | Button click |
| Stats (`/stats`) | `GET` | `http://localhost:3000/api/stats` | `useEffect` on mount |

**Error handling:** All three pages use a `try/catch` pattern. Errors surface the backend's `error.response?.data?.message` field if present, falling back to `error.message`. Errors are displayed via `alert()`.

**Backend base URL:** Currently hardcoded to `http://localhost:3000`. For deployment, this should be moved to an environment variable (see [Environment Setup](#-environment-setup)).

---

##  State Management

There is no global state library. Each page manages its own local state via React `useState`:

```
HomePage          SearchPage         StatsPage
─────────────     ────────────────   ───────────────
url       (str)   query    (str)     stats  (obj|null)
result   (obj)    results  (obj)
loading  (bool)   loading  (bool)
```

The `stats` page is the simplest — a single piece of state loaded once. The ingestion and search pages share an identical three-piece pattern (`input`, `result`, `loading`).

This local-only approach is appropriate for a single-developer tool with no cross-page data sharing requirements. A future enhancement might lift URL history or retrieval session state into a React context or lightweight store.

---

##  Styling System

The app uses **Tailwind CSS v4** via the `@tailwindcss/postcss` plugin (the v4 PostCSS integration, not the v3 CLI). Tailwind is imported directly in `globals.css` with:

```css
@import "tailwindcss";
```

**CSS custom properties** for theming are defined at `:root` and consumed via `@theme inline`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Typography:** Geist Sans and Geist Mono are loaded via `next/font/google` in `layout.js` and injected as CSS variables (`--font-geist-sans`, `--font-geist-mono`), then wired into Tailwind's theme.

**Consistent design language across all three pages:**

| Element | Classes |
|---|---|
| Page background | `min-h-screen bg-gray-50 text-black p-10` |
| Content container | `max-w-6xl mx-auto` |
| Page title | `text-6xl font-bold mb-6` |
| Subtitle | `text-gray-600 text-lg mb-10` |
| Text input | `flex-1 p-5 rounded-2xl border border-gray-300 bg-white outline-none text-lg shadow-sm` |
| Action button | `px-8 py-5 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition` |
| Result card | `bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden` |
| JSON output | `p-6 overflow-x-auto text-sm text-orange-600 leading-7` |
| Navbar | `w-full border-b border-gray-300 bg-white px-10 py-6` |

---

## ⚙️ Installation

**Prerequisites:** Node.js ≥ 18, with the [Trust Scraper backend](../trust-scraper) running on `http://localhost:3000`.

```bash
# Clone the repository
git clone https://github.com/your-username/trust-frontend.git
cd trust-frontend

# Install dependencies
npm install
```

---

##  Environment Setup

The backend URL is currently hardcoded in each page. To make it configurable, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Then update each Axios call from:
```js
await axios.post('http://localhost:3000/api/scrape', { url })
```
to:
```js
await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/scrape`, { url })
```

> `.env.local` is gitignored by default in Next.js projects. Variables prefixed with `NEXT_PUBLIC_` are inlined at build time and accessible in client components.

---

##  Running Locally

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

The dev server starts at: **`http://localhost:3001`** (or the next available port if 3000 is taken by the backend).

> **Important:** The backend must be running at `http://localhost:3000` before using the dashboard. Start the Trust Scraper backend first with `npm run dev` from its directory.

---

##  Example Workflow

A complete end-to-end session using the dashboard:

**Step 1 — Start both servers**
```bash
# Terminal 1: backend
cd trust-scraper && npm run dev

# Terminal 2: frontend
cd trust-frontend && npm run dev
```

**Step 2 — Ingest a document**

Open `http://localhost:3001`. Paste a URL into the input:
```
https://pubmed.ncbi.nlm.nih.gov/38417614/
```
Click **Scrape**. After a few seconds (model inference takes a moment on first run), the JSON panel displays the full response including `trust_score`, `topic_tags`, `content_chunks`, and the generated `embedding_objects`.

**Step 3 — Check the vector store**

Navigate to `/stats`. The panel loads immediately showing `total_vectors`, `parent_chunks`, `child_chunks`, and confirms `semantic_search_enabled: true`.

**Step 4 — Run a semantic query**

Navigate to `/search`. Type a natural language query:
```
What are the clinical findings of this study?
```
Click **Search**. The JSON panel returns the top-5 ranked chunks with `similarity_score` values, metadata for each chunk (domain, source type, tags), and the `retrieval_timestamp`.

**Step 5 — Ingest more sources**

Return to `/` and scrape additional URLs (blog posts, YouTube video transcripts). Each scrape adds more embedding vectors to the store. Re-run the same search query to see how retrieval results change as the store grows.

---

##  Future Improvements

- **Environment variable config** — Move the hardcoded backend URL to `NEXT_PUBLIC_API_URL` in `.env.local`
- **Rendered chunk cards** — Replace the flat JSON `<pre>` output with individual styled cards per retrieved chunk, surfacing similarity score as a visual progress bar
- **Similarity score highlighting** — Color-code results by score threshold (green ≥ 0.85, yellow ≥ 0.70, red below)
- **Ingestion history** — Track scraped URLs in `localStorage` and display a sidebar of previous sources
- **Stats auto-refresh** — Add a polling interval or refresh button to the stats page instead of requiring a full page reload
- **Hallucination & faithfulness UI** — Expose the `/api/hallucination` and `/api/faithfulness` endpoints in a dedicated evaluation tab
- **Error boundary components** — Replace `alert()` error handling with inline error state rendered in the UI
- **Loading skeletons** — Add skeleton placeholder cards while API calls are in-flight
- **Responsive layout** — Optimize the `max-w-6xl` container and input row for mobile viewports
- **Dark mode toggle** — Wire the existing dark mode CSS variables to a manual toggle button in the Navbar

---

##  Learning Outcomes

Building this dashboard demonstrates working knowledge of:

- **Next.js App Router** — file-based routing with `layout.js`, nested route directories, and the `'use client'` directive boundary
- **React 19** — `useState` for controlled inputs and response state, `useEffect` for side effects on mount
- **Tailwind CSS v4** — the new `@import "tailwindcss"` syntax, `@theme inline` for CSS variable integration, and PostCSS via `@tailwindcss/postcss`
- **Axios in Next.js** — direct API calls from client components with response/error handling
- **next/font/google** — loading variable fonts and injecting them as CSS custom properties for Tailwind consumption
- **Developer tooling UI patterns** — designing raw JSON output displays that prioritize data transparency over visual abstraction

---


**[Backend Repository →](../trust-scraper)**

</div>
