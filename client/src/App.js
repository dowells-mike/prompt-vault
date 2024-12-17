import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, Box } from '@mui/material';
import ProjectHeader from './components/ProjectHeader';
import PromptBuilder from './components/PromptBuilder';
import PromptPreview from './components/PromptPreview';
import ProjectList from './components/ProjectList';
import ExportButton from './components/ExportButton';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [promptParts, setPromptParts] = useState([]);
  const [fullPrompt, setFullPrompt] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddPart = () => {
    setPromptParts([
      ...promptParts,
      { id: Date.now().toString(), content: '' }
    ]);
  };

  const handleSaveProject = async () => {
    try {
      const projectData = {
        name: projectName,
        prompts: [{
          parts: promptParts.map(part => part.content),
          fullPrompt,
          images: selectedImages
        }]
      };

      if (selectedProject) {
        await axios.put(`/api/projects/${selectedProject._id}`, projectData);
      } else {
        await axios.post('/api/projects', projectData);
      }

      fetchProjects();
      setProjectName('');
      setPromptParts([]);
      setFullPrompt('');
      setSelectedImages([]);
      setSelectedProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      fetchProjects();
      if (selectedProject?._id === projectId) {
        setSelectedProject(null);
        setProjectName('');
        setPromptParts([]);
        setFullPrompt('');
        setSelectedImages([]);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ProjectHeader
            projectName={projectName}
            setProjectName={setProjectName}
            onSave={handleSaveProject}
            onAddPart={handleAddPart}
          />
          
          <ProjectList
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            onDeleteProject={handleDeleteProject}
          />

          <PromptBuilder
            parts={promptParts}
            setParts={setPromptParts}
          />

          <PromptPreview
            parts={promptParts}
            fullPrompt={fullPrompt}
            setFullPrompt={setFullPrompt}
          />

          <ExportButton
            projectName={projectName}
            fullPrompt={fullPrompt}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
