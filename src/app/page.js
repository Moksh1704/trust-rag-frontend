'use client';

import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function HomePage() {

  const [url, setUrl] =
    useState('');

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleScrape = async () => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/scrape`,
          { url }
        );

      setResult(response.data);

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

            Trust RAG System

          </h1>

          <p className="text-gray-600 text-lg mb-10">

            Multi-source AI retrieval backend with semantic vector search,
            chunking, metadata enrichment, and hallucination evaluation.

          </p>

          <div className="flex gap-4 mb-10">

            <input
              type="text"
              placeholder="Enter article/blog/PubMed URL"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              className="flex-1 p-5 rounded-2xl border border-gray-300 bg-white outline-none text-lg shadow-sm"
            />

            <button
              onClick={handleScrape}
              className="px-8 py-5 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >

              {loading
                ? 'Processing...'
                : 'Scrape'}

            </button>

          </div>

          {result && (

            <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">

              <div className="px-6 py-4 border-b border-gray-200 flex justify-between">

                <h2 className="text-2xl font-bold">

                  JSON Output

                </h2>

                <span className="text-gray-500">

                  Retrieval Metadata

                </span>

              </div>

              <pre className="p-6 overflow-x-auto text-sm text-orange-600 leading-7">

                {JSON.stringify(
                  result,
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