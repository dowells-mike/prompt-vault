import React, { useState } from 'react';
import axios from 'axios';
import ProjectHeader from './components/ProjectHeader';
import PromptBuilder from './components/PromptBuilder';
import PromptPreview from './components/PromptPreview';

const App = () => {
  const [projectName, setProjectName] = useState('');
  const [parts, setParts] = useState(['']);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const fullPrompt = parts.filter(part => part.trim() !== '').join(' ');
      const response = await axios.post('http://localhost:5000/api/projects', {
        name: projectName,
        prompts: [{ parts: parts.filter(part => part.trim() !== ''), fullPrompt }]
      });
      console.log(response.data);
      setSuccess('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Failed to save project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>PromptSaver</h1>
      <ProjectHeader projectName={projectName} setProjectName={setProjectName} />
      <PromptBuilder parts={parts} setParts={setParts} />
      <PromptPreview parts={parts} />

      {/* Error Message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Success Message */}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      <button onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save Project'}
      </button>
    </div>
  );
};

export default App;