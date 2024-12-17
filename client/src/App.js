import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, Box, Divider, Typography } from '@mui/material';
import ProjectHeader from './components/ProjectHeader';
import PromptBuilder from './components/PromptBuilder';
import PromptPreview from './components/PromptPreview';
import ProjectList from './components/ProjectList';
import ExportButton from './components/ExportButton';
import ImageUploader from './components/ImageUploader';

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
  const [images, setImages] = useState([]);

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
          images: images.map(img => ({
            name: img.name,
            data: img.data
          }))
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
      setImages([]);
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
        setImages([]);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setProjectName(project.name);
    if (project.prompts && project.prompts.length > 0) {
      const latestPrompt = project.prompts[project.prompts.length - 1];
      setPromptParts(
        latestPrompt.parts.map((content, index) => ({
          id: `${Date.now()}-${index}`,
          content
        }))
      );
      setFullPrompt(latestPrompt.fullPrompt);
      setImages(latestPrompt.images || []);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            PromptSaver
          </Typography>
          
          <ProjectHeader
            projectName={projectName}
            setProjectName={setProjectName}
            onSave={handleSaveProject}
            onAddPart={handleAddPart}
          />
          
          <ProjectList
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            onDeleteProject={handleDeleteProject}
          />

          <Divider />

          <Typography variant="h6" gutterBottom>
            Prompt Builder
          </Typography>

          <PromptBuilder
            parts={promptParts}
            setParts={setPromptParts}
          />

          <Typography variant="h6" gutterBottom>
            Reference Images
          </Typography>

          <ImageUploader
            images={images}
            setImages={setImages}
          />

          <PromptPreview
            parts={promptParts}
            fullPrompt={fullPrompt}
            setFullPrompt={setFullPrompt}
          />

          <ExportButton
            projectName={projectName}
            fullPrompt={fullPrompt}
            images={images}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
