'use client';

import { useEffect, useState }
from 'react';

import axios from 'axios';

import Navbar
from '../../components/Navbar';

export default function StatsPage() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    async function fetchStats() {

      try {

        const response =
          await axios.get(
            'http://localhost:3000/api/stats'
          );

        setStats(
          response.data
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          error.message
        );
      }
    }

    fetchStats();

  }, []);

  return (

    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 text-black p-10">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-bold mb-6">

            Semantic Retrieval Stats

          </h1>

          <p className="text-gray-600 text-lg mb-10">

            Monitor vector counts, embedding statistics,
            and retrieval system metadata.

          </p>

          {stats && (

            <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">

              <div className="px-6 py-4 border-b border-gray-200 flex justify-between">

                <h2 className="text-2xl font-bold">

                  Vector Store Statistics

                </h2>

                <span className="text-gray-500">

                  Live Retrieval Metrics

                </span>

              </div>

              <pre className="p-6 overflow-x-auto text-sm text-orange-600 leading-7">

                {JSON.stringify(
                  stats,
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