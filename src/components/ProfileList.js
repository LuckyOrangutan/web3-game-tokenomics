import React, { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, ChartBarIcon } from '@heroicons/react/24/solid';

const ProfileList = ({ profiles, onAddProfile, onSelectProfile, onDeleteProfile, onRenameProfile }) => {
  const [newProfileName, setNewProfileName] = useState('');
  const [editingProfileId, setEditingProfileId] = useState(null);
  const [editingProfileName, setEditingProfileName] = useState('');

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      onAddProfile(newProfileName.trim());
      setNewProfileName('');
    }
  };

  const handleRenameProfile = (id) => {
    if (editingProfileName.trim()) {
      onRenameProfile(id, editingProfileName.trim());
      setEditingProfileId(null);
      setEditingProfileName('');
    }
  };

  return (
    <div className="profile-list bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Profiles</h2>
      {profiles.length === 0 ? (
        <div className="text-center py-8">
          <img
            src="/empty-profile.svg"
            alt="No profiles"
            className="mx-auto w-32 h-32 mb-4"
          />
          <p className="text-gray-500 mb-4">No profiles created yet. Start by adding a new profile!</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {profiles.map((profile) => (
            <li key={profile.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">{profile.name[0].toUpperCase()}</span>
                </div>
                {editingProfileId === profile.id ? (
                  <input
                    type="text"
                    value={editingProfileName}
                    onChange={(e) => setEditingProfileName(e.target.value)}
                    onBlur={() => handleRenameProfile(profile.id)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRenameProfile(profile.id)}
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                ) : (
                  <div>
                    <h3 className="font-semibold">{profile.name}</h3>
                    <p className="text-sm text-gray-500">{profile.nodes.length} nodes</p>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingProfileId(profile.id);
                    setEditingProfileName(profile.name);
                  }}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectProfile(profile.id)}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <ChartBarIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDeleteProfile(profile.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="New profile name"
          className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddProfile}
          className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProfileList;