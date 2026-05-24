'use client';

import Link from 'next/link';

export default function Navbar() {

  return (

    <nav className="w-full border-b border-gray-300 bg-white px-10 py-6">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-3xl font-bold">

          Trust RAG

        </h1>

        <div className="flex gap-10 text-lg">

          <Link href="/">
            Ingestion
          </Link>

          <Link href="/search">
            Search
          </Link>

          <Link href="/stats">
            Stats
          </Link>

        </div>

      </div>

    </nav>
  );
}