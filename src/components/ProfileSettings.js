import React, { useState } from 'react';

const ProfileSettings = ({ profile, onUpdateProfile, onBack }) => {
  const [name, setName] = useState(profile.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ ...profile, name });
  };

  return (
    <div className="profile-settings">
      <button
        onClick={onBack}
        className="mb-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        &larr; Back to Profiles
      </button>
      <h2 className="text-2xl font-bold mb-4">{profile.name} Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="profileName" className="block text-sm font-medium text-gray-700">
            Profile Name
          </label>
          <input
            type="text"
            id="profileName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;