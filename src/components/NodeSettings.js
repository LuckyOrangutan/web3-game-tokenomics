import React, { useState, useEffect } from 'react';

const NodeSettings = ({ node, onUpdate, onDelete }) => {
  const [settings, setSettings] = useState(node.data.settings);

  useEffect(() => {
    setSettings(node.data.settings);
  }, [node]);

  const handleSettingChange = (key, value) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    onUpdate(node.id, updatedSettings);
  };

  const handleRemoveLine = (key) => {
    const updatedSettings = { ...settings };
    delete updatedSettings[key];
    setSettings(updatedSettings);
    onUpdate(node.id, updatedSettings);
  };

  const handleAddLine = () => {
    const newKey = `newSetting${Object.keys(settings).length}`;
    handleSettingChange(newKey, '');
  };

  return (
    <div className="node-settings bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">{node.data.label} Settings</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          value={node.data.label}
          onChange={(e) => onUpdate(node.id, { ...node.data, label: e.target.value })}
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
              onUpdate(node.id, updatedSettings);
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
        Add Line
      </button>
      <button
        onClick={() => onDelete(node.id)}
        className="bg-red-500 text-white px-2 py-1 rounded mt-2 ml-2"
      >
        Delete Node
      </button>
    </div>
  );
};

export default NodeSettings;