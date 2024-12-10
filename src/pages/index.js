import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MissionList from '../components/MissionList';

export default function Home() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await fetch('/api/missions');
        const data = await res.json();
        if (data.success) {
          setMissions(data.data);
        }
      } catch (error) {
        console.error('Error fetching missions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Head>
        <title>SpaceMission Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-800">SpaceMission Tracker</h1>
          <Link href="/add-mission" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
            Add New Mission
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <MissionList missions={missions} />
        )}
      </main>
    </div>
    
  );
}