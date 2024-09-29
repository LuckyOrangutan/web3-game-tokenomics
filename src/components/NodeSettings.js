import React, { useState, useEffect } from 'react';

const NodeSettings = ({ node, onUpdate }) => {
  const [settings, setSettings] = useState(node.data.settings);
  const [label, setLabel] = useState(node.data.label);

  useEffect(() => {
    setSettings(node.data.settings);
    setLabel(node.data.label);
  }, [node]);

  const handleSettingChange = (key, value) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    onUpdate(node.id, { settings: updatedSettings, label });
  };

  const handleLabelChange = (value) => {
    setLabel(value);
    onUpdate(node.id, { settings, label: value });
  };

  const handleRemoveLine = (key) => {
    const updatedSettings = { ...settings };
    delete updatedSettings[key];
    setSettings(updatedSettings);
    onUpdate(node.id, { settings: updatedSettings, label });
  };

  const handleAddLine = () => {
    const newKey = `newSetting${Object.keys(settings).length}`;
    handleSettingChange(newKey, '');
  };

  return (
    <div className="node-settings">
      <div className="input-group mb-4">
        <label className="label-text">Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="input-field"
        />
      </div>
      {Object.entries(settings).map(([key, value]) => (
        <div key={key} className="input-group mb-2">
          <label className="label-text">{key}</label>
          <div className="flex items-center">
            <input
              type="text"
              value={value}
              onChange={(e) => handleSettingChange(key, e.target.value)}
              className="input-field mr-2"
            />
            <button
              onClick={() => handleRemoveLine(key)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddLine}
        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
      >
        Add Setting
      </button>
    </div>
  );
};

export default NodeSettings;