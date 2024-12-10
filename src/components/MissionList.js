import React from 'react';
import Link from 'next/link';

const MissionList = ({ missions }) => {
  return (
    <div className="mission-grid">
      {missions.map((mission) => (
        <div key={mission._id} className="mission-card">
          <h2 className="mission-title">{mission.name}</h2>
          <p className="mission-detail">Agency: {mission.agency}</p>
          <p className="mission-detail">
            Launch Date: {new Date(mission.launchDate).toLocaleDateString()}
          </p>
          <p className="mission-detail">Status: {mission.status}</p>
          <Link href={`/mission/${mission._id}`} className="mission-link">
            View/Edit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MissionList;