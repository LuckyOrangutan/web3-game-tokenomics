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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {Object.entries(settings).map(([key, value]) => (
        <div key={key} className="mb-2 flex items-center">
          <input
            type="text"
            value={key}
            onChange={(e) => {
              const updatedSettings = { ...settings };
              delete updatedSettings[key];
              updatedSettings[e.target.value] = value;
              setSettings(updatedSettings);
              onUpdate(node.id, { settings: updatedSettings, label });
            }}
            className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => handleSettingChange(key, e.target.value)}
            className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
          />
          <button
            onClick={() => handleRemoveLine(key)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
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