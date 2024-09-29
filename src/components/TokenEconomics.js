import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/TokenEconomics.css';

const TokenEconomics = ({ settings, setSettings }) => {
  const [view, setView] = useState('display');
  const { initialSupply, initialPlayerBase, monthlyBurnRate, monthlyPlayerGrowth, tokensPerPlayer } = settings;

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

  const renderSettings = () => (
    <div className="token-economics__settings">
      <div className="input-group">
        <label className="label-text">Initial Token Supply</label>
        <input
          type="number"
          value={initialSupply}
          onChange={(e) => setSettings({ ...settings, initialSupply: Number(e.target.value) })}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Initial Player Base</label>
        <input
          type="number"
          value={initialPlayerBase}
          onChange={(e) => setSettings({ ...settings, initialPlayerBase: Number(e.target.value) })}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Monthly Burn Rate</label>
        <input
          type="number"
          value={monthlyBurnRate}
          onChange={(e) => setSettings({ ...settings, monthlyBurnRate: Number(e.target.value) })}
          className="input-field"
          step="0.01"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Monthly Player Growth</label>
        <input
          type="number"
          value={monthlyPlayerGrowth}
          onChange={(e) => setSettings({ ...settings, monthlyPlayerGrowth: Number(e.target.value) })}
          className="input-field"
          step="0.01"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Tokens Per Player</label>
        <input
          type="number"
          value={tokensPerPlayer}
          onChange={(e) => setSettings({ ...settings, tokensPerPlayer: Number(e.target.value) })}
          className="input-field"
        />
      </div>
    </div>
  );

  const renderDisplay = () => (
    <div className="token-economics__chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
          <YAxis yAxisId="left" label={{ value: 'Token Amount', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Players', angle: 90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="supply" stroke="#3B82F6" name="Token Supply" />
          <Line yAxisId="left" type="monotone" dataKey="burned" stroke="#10B981" name="Tokens Burned" />
          <Line yAxisId="right" type="monotone" dataKey="players" stroke="#F59E0B" name="Player Base" />
          <Line yAxisId="left" type="monotone" dataKey="demand" stroke="#EF4444" name="Token Demand" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="token-economics">
      <div className="token-economics__controls">
        <button
          className={`button ${view === 'display' ? 'active' : ''}`}
          onClick={() => setView('display')}
        >
          Display
        </button>
        <button
          className={`button ${view === 'settings' ? 'active' : ''}`}
          onClick={() => setView('settings')}
        >
          Settings
        </button>
      </div>
      {view === 'display' ? renderDisplay() : renderSettings()}
    </div>
  );
};

export default TokenEconomics;