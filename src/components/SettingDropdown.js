import React, { useState, useEffect } from 'react';

const SettingDropdown = ({ settings, onSelect, onClose }) => {
  const [selectedSetting, setSelectedSetting] = useState('');
  const [settingValue, setSettingValue] = useState('');

  useEffect(() => {
    if (selectedSetting && settings) {
      setSettingValue(settings[selectedSetting]);
    }
  }, [selectedSetting, settings]);

  const handleChange = (e) => {
    setSelectedSetting(e.target.value);
  };

  const handleSelect = () => {
    if (selectedSetting) {
      onSelect(selectedSetting);
    }
  };

  if (!settings) {
    return null;
  }

  return (
    <div className="setting-dropdown flex items-center">
      <select
        value={selectedSetting}
        onChange={handleChange}
        className="input-field mr-2"
      >
        <option value="">Select a setting</option>
        {Object.keys(settings).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {selectedSetting && (
        <span className="text-gray-700 mr-2">{settingValue}</span>
      )}
      <button
        onClick={handleSelect}
        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
        disabled={!selectedSetting}
      >
        Add
      </button>
      <button
        onClick={onClose}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default SettingDropdown;