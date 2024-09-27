import React from 'react';
import TokenEconomics from './components/TokenEconomics';
import UserJourney from './components/UserJourney';
import TokenAllocation from './components/TokenAllocation';
import './App.css';

function App() {
  return (
    <div className="App bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Web3 Game Tokenomics Simulator</h1>
      </header>
      <main className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Token Allocation</h2>
            <TokenAllocation />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Token Economics</h2>
            <TokenEconomics />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">User Journey</h2>
            <UserJourney />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;