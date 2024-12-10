
import React from 'react';
import Link from 'next/link';

const MissionList = ({ missions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {missions.map((mission) => (
        <div key={mission._id} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">{mission.name}</h2>
          <p className="text-gray-600 mb-2">Agency: {mission.agency}</p>
          <p className="text-gray-600 mb-2">
            Launch Date: {new Date(mission.launchDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-2">Status: {mission.status}</p>
          <Link href={`/mission/${mission._id}`} className="text-blue-500 hover:underline">
            View/Edit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MissionList;