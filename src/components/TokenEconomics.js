import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/TokenEconomics.css';

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
    <div className="token-economics grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="token-economics__settings">
        <h3 className="text-xl font-semibold mb-4">Token Economics Settings</h3>
        <div className="space-y-4">
          <div className="input-group">
            <label className="label-text">Initial Token Supply</label>
            <input
              type="number"
              value={initialSupply}
              onChange={(e) => setInitialSupply(Number(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="label-text">Initial Player Base</label>
            <input
              type="number"
              value={initialPlayerBase}
              onChange={(e) => setInitialPlayerBase(Number(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="label-text">Monthly Burn Rate</label>
            <input
              type="number"
              value={monthlyBurnRate}
              onChange={(e) => setMonthlyBurnRate(Number(e.target.value))}
              className="input-field"
              step="0.01"
            />
          </div>
          <div className="input-group">
            <label className="label-text">Monthly Player Growth</label>
            <input
              type="number"
              value={monthlyPlayerGrowth}
              onChange={(e) => setMonthlyPlayerGrowth(Number(e.target.value))}
              className="input-field"
              step="0.01"
            />
          </div>
          <div className="input-group">
            <label className="label-text">Tokens Per Player</label>
            <input
              type="number"
              value={tokensPerPlayer}
              onChange={(e) => setTokensPerPlayer(Number(e.target.value))}
              className="input-field"
            />
          </div>
        </div>
      </div>
      <div className="token-economics__chart">
        <h3 className="text-xl font-semibold mb-4">Token Economics Simulation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="supply" stroke="#3B82F6" name="Token Supply" />
            <Line yAxisId="left" type="monotone" dataKey="burned" stroke="#10B981" name="Tokens Burned" />
            <Line yAxisId="right" type="monotone" dataKey="players" stroke="#F59E0B" name="Player Base" />
            <Line yAxisId="left" type="monotone" dataKey="demand" stroke="#EF4444" name="Token Demand" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TokenEconomics;