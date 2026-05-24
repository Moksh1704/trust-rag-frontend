'use client';

import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function SearchPage() {

  const [query, setQuery] =
    useState('');

  const [results, setResults] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleSearch = async () => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          'http://localhost:3000/api/retrieve',
          { query }
        );

      setResults(response.data);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 text-black p-10">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-bold mb-6">

            Semantic Vector Search

          </h1>

          <p className="text-gray-600 text-lg mb-10">

            Query the vector store using semantic similarity retrieval.

          </p>

          <div className="flex gap-4 mb-10">

            <input
              type="text"
              placeholder="Search semantic chunks..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              className="flex-1 p-5 rounded-2xl border border-gray-300 bg-white outline-none text-lg shadow-sm"
            />

            <button
              onClick={handleSearch}
              className="px-8 py-5 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >

              {loading
                ? 'Searching...'
                : 'Search'}

            </button>

          </div>

          {results && (

            <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">

              <div className="px-6 py-4 border-b border-gray-200 flex justify-between">

                <h2 className="text-2xl font-bold">

                  Retrieval Results

                </h2>

                <span className="text-gray-500">

                  JSON Response

                </span>

              </div>

              <pre className="p-6 overflow-x-auto text-sm text-orange-600 leading-7">

                {JSON.stringify(
                  results,
                  null,
                  2
                )}

              </pre>

            </div>
          )}

        </div>

      </main>
    </>
  );
}