import React, { useState, useEffect } from 'react';
import SettingDropdown from './SettingDropdown';

const NodeSettings = ({ node, onUpdate, gameSettings }) => {
  const [settings, setSettings] = useState(node.data.settings);
  const [label, setLabel] = useState(node.data.label);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleDropdownSelect = (key) => {
    console.log('Selected key:', key);
    console.log('Game Settings:', gameSettings);
    if (key && gameSettings[key] !== undefined) {
      const updatedSettings = { ...settings, [key]: gameSettings[key] };
      setSettings(updatedSettings);
      onUpdate(node.id, { settings: updatedSettings, label });
    } else {
      console.warn(`Game setting for key "${key}" is undefined.`);
    }
    setShowDropdown(false);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const handleAddLine = () => {
    setShowDropdown(true);
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
      {showDropdown ? (
        <SettingDropdown
          settings={gameSettings}
          onSelect={handleDropdownSelect}
          onClose={handleDropdownClose}
        />
      ) : (
        <button
          onClick={handleAddLine}
          className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
        >
          Add Setting
        </button>
      )}
    </div>
  );
};

export default NodeSettings;