
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
  });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Head>
        <title>{mission ? `${mission.name} - SpaceMission Tracker` : 'Loading...'}</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800">{mission ? mission.name : 'Loading...'}</h1>
          <Link href="/" className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
            Back to Missions
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !mission ? (
          <p>Mission not found</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <MissionForm onSubmit={handleUpdate} initialData={mission} />
            <button
              onClick={handleDelete}
              className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Delete Mission
            </button>
          </div>
        )}
      </div>
    </div>
  );
}