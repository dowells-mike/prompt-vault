import React, { useState } from 'react';
import axios from 'axios';
import ProjectHeader from './components/ProjectHeader';
import PromptBuilder from './components/PromptBuilder';
import PromptPreview from './components/PromptPreview';
import ExportButton from './components/ExportButton';

const App = () => {
  const [projectName, setProjectName] = useState('');
  const [parts, setParts] = useState(['']);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/projects', {
        name: projectName
      });
      console.log(response.data); 
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <div>
      <h1>PromptSaver</h1>
      <ProjectHeader projectName={projectName} setProjectName={setProjectName} />
      <PromptBuilder parts={parts} setParts={setParts} />
      <PromptPreview parts={parts} />
      <button onClick={handleSave}>Save Project</button>
    </div>
  );
};

export default App;