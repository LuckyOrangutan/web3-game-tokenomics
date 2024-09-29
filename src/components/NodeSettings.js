import React, { useState, useEffect } from 'react';

const NodeSettings = ({ node, onUpdate }) => {
  const [settings, setSettings] = useState(node.data.settings);

  useEffect(() => {
    setSettings(node.data.settings);
  }, [node]);

  const handleSettingChange = (key, value) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    onUpdate(node.id, updatedSettings);
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
      {/* Add more settings fields here based on the node type */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Custom Setting</label>
        <input
          type="text"
          value={settings.customSetting || ''}
          onChange={(e) => handleSettingChange('customSetting', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
};

export default NodeSettings;