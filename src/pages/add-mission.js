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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Head>
        <title>Add New Mission - SpaceMission Tracker</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800">Add New Mission</h1>
          <Link href="/" className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
            Back to Missions
          </Link>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="bg-white rounded-lg shadow-md p-6">
          <MissionForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}