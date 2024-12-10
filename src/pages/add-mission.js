
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import MissionForm from '../components/MissionForm';

export default function AddMission() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch('/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/');
      } else {
        setError('Failed to add mission');
      }
    } catch (error) {
      console.error('Error adding mission:', error);
      setError('An error occurred while adding the mission');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Add New Mission - SpaceMission Tracker</title>
      </Head>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Mission</h1>
        <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Back to Missions
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <MissionForm onSubmit={handleSubmit} />
    </div>
  );
}