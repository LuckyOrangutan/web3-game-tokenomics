import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TokenEconomics = () => {
  const [initialSupply, setInitialSupply] = useState(1000000);
  const [initialPlayerBase, setInitialPlayerBase] = useState(1000);
  const [monthlyBurnRate, setMonthlyBurnRate] = useState(0.05);
  const [monthlyPlayerGrowth, setMonthlyPlayerGrowth] = useState(0.1);
  const [tokensPerPlayer, setTokensPerPlayer] = useState(100);

  const simulateTokenomics = () => {
    let data = [];
    let currentSupply = initialSupply;
    let currentPlayers = initialPlayerBase;

    for (let month = 1; month <= 24; month++) {
      const tokensDemand = currentPlayers * tokensPerPlayer;
      const tokensBurned = Math.min(currentSupply * monthlyBurnRate, tokensDemand);
      currentSupply -= tokensBurned;

      currentPlayers = Math.floor(currentPlayers * (1 + monthlyPlayerGrowth));

      data.push({
        month,
        supply: Math.round(currentSupply),
        burned: Math.round(tokensBurned),
        players: currentPlayers,
        demand: Math.round(tokensDemand)
      });
    }

    return data;
  };

  const data = simulateTokenomics();

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Token Economics Simulation</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block">
            Initial Token Supply:
            <input
              type="number"
              value={initialSupply}
              onChange={(e) => setInitialSupply(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Initial Player Base:
            <input
              type="number"
              value={initialPlayerBase}
              onChange={(e) => setInitialPlayerBase(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Monthly Burn Rate:
            <input
              type="number"
              step="0.01"
              value={monthlyBurnRate}
              onChange={(e) => setMonthlyBurnRate(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Monthly Player Growth:
            <input
              type="number"
              step="0.01"
              value={monthlyPlayerGrowth}
              onChange={(e) => setMonthlyPlayerGrowth(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Tokens Per Player:
            <input
              type="number"
              value={tokensPerPlayer}
              onChange={(e) => setTokensPerPlayer(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="supply" stroke="#8884d8" name="Token Supply" />
          <Line yAxisId="left" type="monotone" dataKey="burned" stroke="#82ca9d" name="Tokens Burned" />
          <Line yAxisId="right" type="monotone" dataKey="players" stroke="#ffc658" name="Player Base" />
          <Line yAxisId="left" type="monotone" dataKey="demand" stroke="#ff7300" name="Token Demand" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenEconomics;