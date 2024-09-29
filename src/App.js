import React, { useState } from 'react';
import TokenEconomics from './components/TokenEconomics';
import UserJourney from './components/UserJourney';
import TokenAllocation from './components/TokenAllocation';
import AstraenCrystalCost from './components/AstraenCrystalCost';
import GameLogic from './components/GameLogic';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('display');

  const renderPage = () => {
    switch (currentPage) {
      case 'settings':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">Token Allocation</h2>
              <TokenAllocation />
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">Token Economics</h2>
              <TokenEconomics />
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">Astraen Crystal Cost</h2>
              <AstraenCrystalCost />
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">User Journey</h2>
              <UserJourney />
            </div>
          </div>
        );
      case 'logic':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Game Logic</h2>
            <GameLogic />
          </div>
        );
      case 'display':
      default:
        return <h2 className="text-2xl font-bold mb-4 text-indigo-700">Display Page (To be implemented)</h2>;
    }
  };

  return (
    <div className="App bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center mb-4">Web3 Game Tokenomics Simulator</h1>
          <p className="text-center text-xl">Optimize your game's economy with data-driven insights</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
      </header>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <ul className="flex justify-center space-x-6">
            <li>
              <button
                onClick={() => setCurrentPage('display')}
                className={`text-gray-800 hover:text-indigo-600 ${currentPage === 'display' ? 'font-bold border-b-2 border-indigo-600' : ''}`}
              >
                Display
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('logic')}
                className={`text-gray-800 hover:text-indigo-600 ${currentPage === 'logic' ? 'font-bold border-b-2 border-indigo-600' : ''}`}
              >
                Logic
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('settings')}
                className={`text-gray-800 hover:text-indigo-600 ${currentPage === 'settings' ? 'font-bold border-b-2 border-indigo-600' : ''}`}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container mx-auto p-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;