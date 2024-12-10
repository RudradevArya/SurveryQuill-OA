import React from 'react';
import Link from 'next/link';

const MissionList = ({ missions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {missions.map((mission) => (
        <div key={mission._id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">{mission.name}</h2>
            <p className="text-gray-600 mb-2">Agency: {mission.agency}</p>
            <p className="text-gray-600 mb-2">
              Launch Date: {new Date(mission.launchDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-4">Status: {mission.status}</p>
            <Link href={`/mission/${mission._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
              View/Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MissionList;