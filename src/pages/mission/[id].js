
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import MissionForm from '../../components/MissionForm';

export default function MissionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchMission();
    }
  }, [id]);

  const fetchMission = async () => {
    try {
      const res = await fetch(`/api/missions/${id}`);
      const data = await res.json();
      if (data.success) {
        setMission(data.data);
      } else {
        setError('Failed to fetch mission');
      }
    } catch (error) {
      console.error('Error fetching mission:', error);
      setError('An error occurred while fetching the mission');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const res = await fetch(`/api/missions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/');
      } else {
        setError('Failed to update mission');
      }
    } catch (error) {
      console.error('Error updating mission:', error);
      setError('An error occurred while updating the mission');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this mission?')) {
      try {
        const res = await fetch(`/api/missions/${id}`, {
          method: 'DELETE',
        });

        const data = await res.json();

        if (data.success) {
          router.push('/');
        } else {
          setError('Failed to delete mission');
        }
      } catch (error) {
        console.error('Error deleting mission:', error);
        setError('An error occurred while deleting the mission');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!mission) return <p>Mission not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{mission.name} - SpaceMission Tracker</title>
      </Head>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{mission.name}</h1>
        <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Back to Missions
        </Link>
      </div>

      <MissionForm onSubmit={handleUpdate} initialData={mission} />
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Mission
      </button>
    </div>
  );
}