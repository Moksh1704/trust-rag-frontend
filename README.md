# Trust-Aware RAG Frontend

Frontend interface for the Trust-Aware RAG system built using Next.js.

The application allows users to:
- scrape URLs
- analyze trust scores
- view metadata
- inspect chunked outputs
- perform semantic retrieval

---

# Features

- URL scraping interface
- Trust score visualization
- Metadata display
- Parent-child chunk visualization
- Retrieval query interface
- Responsive UI

---

# Tech Stack

- Next.js
- React.js
- Axios
- Tailwind CSS

---

# Frontend Pages

## Scrape Page

Allows users to:
- Enter URLs
- Trigger scraping
- View extracted metadata
- Inspect trust scores

## Stats Page

Displays:
- Total parent chunks
- Total child chunks
- Trust breakdown
- Metadata statistics

## Retrieval Page

Supports semantic retrieval queries using backend APIs.

---

# API Integration

Frontend communicates with backend APIs using:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

# How to Run

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Runs on:

```text
http://localhost:3001
```

---

# Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

# Limitations

- Requires backend server to be running
- Depends on transcript availability for YouTube videos
- Some websites may block scraping requests

---

# Future Improvements

- Authentication system
- Dark/light mode toggle
- Real-time scraping updates
- Vector similarity visualization
- Search result ranking UI
