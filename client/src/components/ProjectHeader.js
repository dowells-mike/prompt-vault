import React, { useState } from 'react';

const ProjectHeader = ({ projectName, setProjectName }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </div>
  );
};

export default ProjectHeader;