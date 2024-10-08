import React, { useState } from 'react';
import ProfileList from './ProfileList';
import ProfileSimulation from './ProfileSimulation';

const DisplayScreen = ({ profiles, gameSettings, onSelectProfile, onBack }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  if (selectedProfile) {
    return (
      <ProfileSimulation
        profile={selectedProfile}
        gameSettings={gameSettings}
        onBack={() => setSelectedProfile(null)}
      />
    );
  }

  return (
    <div className="display-screen">
      <ProfileList
        profiles={profiles}
        onSelectProfile={handleProfileClick}
      />
    </div>
  );
};

export default DisplayScreen;