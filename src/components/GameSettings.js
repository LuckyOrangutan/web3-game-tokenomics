import React from 'react';

const GameSettings = ({ settings, updateSettings }) => {
  const handleChange = (e, index) => {
    const newQuestSlotCosts = [...settings.questSlotCosts];
    newQuestSlotCosts[index] = parseInt(e.target.value);
    updateSettings({ questSlotCosts: newQuestSlotCosts });
  };

  return (
    <div className="game-settings mb-4">
      <h3 className="text-xl font-bold mb-2">Game Settings</h3>
      <div className="quest-slot-costs">
        <h4 className="text-lg font-semibold">Quest Slot Costs</h4>
        {settings.questSlotCosts.map((cost, index) => (
          <input
            key={index}
            type="number"
            value={cost}
            onChange={(e) => handleChange(e, index)}
            className="input-field mr-2 mb-2"
          />
        ))}
      </div>
      <div className="crystals-per-quest">
        <h4 className="text-lg font-semibold">Crystals per Quest</h4>
        <input
          type="number"
          value={settings.crystalsPerQuest.min}
          onChange={(e) => updateSettings({ crystalsPerQuest: { ...settings.crystalsPerQuest, min: parseInt(e.target.value) } })}
          className="input-field mr-2"
        />
        <input
          type="number"
          value={settings.crystalsPerQuest.max}
          onChange={(e) => updateSettings({ crystalsPerQuest: { ...settings.crystalsPerQuest, max: parseInt(e.target.value) } })}
          className="input-field"
        />
      </div>
      <div className="mark-cost">
        <h4 className="text-lg font-semibold">Mark Cost</h4>
        <input
          type="number"
          value={settings.markCost}
          onChange={(e) => updateSettings({ markCost: parseInt(e.target.value) })}
          className="input-field"
        />
      </div>
    </div>
  );
};

export default GameSettings;