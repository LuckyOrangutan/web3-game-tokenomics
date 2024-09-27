import React from 'react';
import TokenEconomics from './components/TokenEconomics';
import UserJourney from './components/UserJourney';
import TokenAllocation from './components/TokenAllocation';

function App() {
  return (
    <div className="App bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Web3 Game Tokenomics Simulator</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="space-y-8">
          <TokenAllocation />
          <TokenEconomics />
          <UserJourney />
        </div>
      </main>
    </div>
  );
}

export default App;