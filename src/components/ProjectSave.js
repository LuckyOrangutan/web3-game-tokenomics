import React, { useState } from 'react';

const ProjectSave = ({ playerProfiles, gameSettings }) => {
  const [projectName, setProjectName] = useState('');

  const saveProject = () => {
    const project = {
      name: projectName,
      playerProfiles,
      gameSettings,
    };
    // Save the project to localStorage or send it to a backend
    console.log('Saving project:', project);
  };

  return (
    <div className="project-save mt-4">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        className="input-field mr-2"
      />
      <button onClick={saveProject} className="button">
        Save Project
      </button>
    </div>
  );
};

export default ProjectSave;