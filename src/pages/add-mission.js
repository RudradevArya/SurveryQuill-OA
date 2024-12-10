
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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

      <h1 className="text-3xl font-bold mb-8">Add New Mission</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <MissionForm onSubmit={handleSubmit} />
    </div>
  );
}