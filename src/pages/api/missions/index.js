import { useState, useEffect } from 'react';
import Head from 'next/head';
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
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>SpaceMission Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-8">SpaceMission Tracker</h1>
        {loading ? (
          <p>Loading missions...</p>
        ) : (
          <MissionList missions={missions} />
        )}
      </main>
    </div>
  );
}