import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserJourney = () => {
  const [initialTokens, setInitialTokens] = useState(100);
  const [questSlotCost, setQuestSlotCost] = useState(20);
  const [profileEnhancementCost, setProfileEnhancementCost] = useState(30);
  const [cosmeticCost, setCosmeticCost] = useState(10);
  const [boostCost, setBoostCost] = useState(15);

  const simulateUserJourney = () => {
    let tokens = initialTokens;
    let unlockedQuestSlots = 1;
    let profileEnhancements = 0;
    let cosmetics = 0;
    let boosts = 0;

    const journey = [];

    for (let step = 1; step <= 10; step++) {
      // Simulate earning tokens
      tokens += Math.floor(Math.random() * 20) + 10;

      // Unlock quest slots
      while (tokens >= questSlotCost && unlockedQuestSlots < 5) {
        tokens -= questSlotCost;
        unlockedQuestSlots++;
      }

      // Buy profile enhancements
      if (tokens >= profileEnhancementCost) {
        tokens -= profileEnhancementCost;
        profileEnhancements++;
      }

      // Buy cosmetics
      if (tokens >= cosmeticCost) {
        tokens -= cosmeticCost;
        cosmetics++;
      }

      // Buy boosts
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

  const data = simulateUserJourney();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Journey Simulation</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block">
            Initial Tokens:
            <input
              type="number"
              value={initialTokens}
              onChange={(e) => setInitialTokens(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Quest Slot Cost:
            <input
              type="number"
              value={questSlotCost}
              onChange={(e) => setQuestSlotCost(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Profile Enhancement Cost:
            <input
              type="number"
              value={profileEnhancementCost}
              onChange={(e) => setProfileEnhancementCost(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Cosmetic Cost:
            <input
              type="number"
              value={cosmeticCost}
              onChange={(e) => setCosmeticCost(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Boost Cost:
            <input
              type="number"
              value={boostCost}
              onChange={(e) => setBoostCost(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="step" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tokens" fill="#8884d8" name="Tokens" />
          <Bar dataKey="questSlots" fill="#82ca9d" name="Quest Slots" />
          <Bar dataKey="profileEnhancements" fill="#ffc658" name="Profile Enhancements" />
          <Bar dataKey="cosmetics" fill="#ff7300" name="Cosmetics" />
          <Bar dataKey="boosts" fill="#a4de6c" name="Boosts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserJourney;