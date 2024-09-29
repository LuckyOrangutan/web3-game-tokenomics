import React from 'react';
import TokenAllocation from './TokenAllocation';
import TokenEconomics from './TokenEconomics';
import AstraenCrystalCost from './AstraenCrystalCost';
import UserJourney from './UserJourney';

const DisplayScreen = ({ profile, gameSettings, onBack }) => {
  return (
    <div className="display-screen">
      <button
        onClick={onBack}
        className="mb-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        &larr; Back to Profiles
      </button>
      <h2 className="text-2xl font-bold mb-4">{profile.name} - Simulation Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-bold mb-4 text-indigo-700">Token Allocation</h3>
          <TokenAllocation allocations={gameSettings.tokenAllocations} setAllocations={() => {}} />
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-bold mb-4 text-indigo-700">Token Economics</h3>
          <TokenEconomics settings={gameSettings.tokenEconomicsSettings} setSettings={() => {}} />
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-bold mb-4 text-indigo-700">Astraen Crystal Cost</h3>
          <AstraenCrystalCost settings={gameSettings.astraenCrystalSettings} setSettings={() => {}} />
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-bold mb-4 text-indigo-700">User Journey</h3>
          <UserJourney settings={gameSettings.userJourneySettings} setSettings={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;