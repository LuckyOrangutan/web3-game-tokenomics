import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/UserJourney.css';

const UserJourney = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState('display');
  const [initialTokens, setInitialTokens] = useState(100);
  const [questSlotCost, setQuestSlotCost] = useState(20);
  const [profileEnhancementCost, setProfileEnhancementCost] = useState(30);
  const [cosmeticCost, setCosmeticCost] = useState(10);
  const [boostCost, setBoostCost] = useState(15);

  useEffect(() => {
    setData(simulateUserJourney());
  }, [initialTokens, questSlotCost, profileEnhancementCost, cosmeticCost, boostCost]);

  const simulateUserJourney = () => {
    let tokens = initialTokens;
    let unlockedQuestSlots = 1;
    let profileEnhancements = 0;
    let cosmetics = 0;
    let boosts = 0;

    const journey = [];

    for (let step = 1; step <= 10; step++) {
      tokens += Math.floor(Math.random() * 20) + 10;

      while (tokens >= questSlotCost && unlockedQuestSlots < 5) {
        tokens -= questSlotCost;
        unlockedQuestSlots++;
      }

      if (tokens >= profileEnhancementCost) {
        tokens -= profileEnhancementCost;
        profileEnhancements++;
      }

      if (tokens >= cosmeticCost) {
        tokens -= cosmeticCost;
        cosmetics++;
      }

      if (tokens >= boostCost) {
        tokens -= boostCost;
        boosts++;
      }

      journey.push({
        step,
        tokens,
        questSlots: unlockedQuestSlots,
        profileEnhancements,
        cosmetics,
        boosts
      });
    }

    return journey;
  };

  const renderSettings = () => (
    <div className="user-journey__settings">
      <div className="input-group">
        <label className="label-text">Initial Tokens</label>
        <input
          type="number"
          value={initialTokens}
          onChange={(e) => setInitialTokens(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Quest Slot Cost</label>
        <input
          type="number"
          value={questSlotCost}
          onChange={(e) => setQuestSlotCost(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Profile Enhancement Cost</label>
        <input
          type="number"
          value={profileEnhancementCost}
          onChange={(e) => setProfileEnhancementCost(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Cosmetic Cost</label>
        <input
          type="number"
          value={cosmeticCost}
          onChange={(e) => setCosmeticCost(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label-text">Boost Cost</label>
        <input
          type="number"
          value={boostCost}
          onChange={(e) => setBoostCost(Number(e.target.value))}
          className="input-field"
        />
      </div>
    </div>
  );

  const renderDisplay = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="step" label={{ value: 'Steps', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Amount', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="tokens" fill="#8884d8" name="Tokens" />
        <Bar dataKey="questSlots" fill="#82ca9d" name="Quest Slots" />
        <Bar dataKey="profileEnhancements" fill="#ffc658" name="Profile Enhancements" />
        <Bar dataKey="cosmetics" fill="#ff7300" name="Cosmetics" />
        <Bar dataKey="boosts" fill="#a4de6c" name="Boosts" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="user-journey">
      <div className="user-journey__controls">
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

export default UserJourney;