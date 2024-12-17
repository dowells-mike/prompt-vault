import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, Box, Typography, Stack } from '@mui/material';
import ProjectHeader from './components/ProjectHeader';
import PromptBuilder from './components/PromptBuilder';
import PromptPreview from './components/PromptPreview';
import ProjectList from './components/ProjectList';
import ExportButton from './components/ExportButton';
import ImageUploader from './components/ImageUploader';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [promptParts, setPromptParts] = useState([]);
  const [fullPrompt, setFullPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#2196f3',
          },
          secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#f50057',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f5f5f5',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600,
            letterSpacing: '-0.5px'
          }
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                boxShadow: mode === 'dark' 
                  ? '0 2px 4px rgba(0,0,0,0.2)' 
                  : '0 2px 4px rgba(0,0,0,0.1)',
              },
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

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

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ThemeToggle 
          isDarkMode={mode === 'dark'} 
          onToggle={toggleTheme}
        />
        
        <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Stack 
              direction="row" 
              alignItems="center" 
              spacing={2} 
              sx={{ 
                mb: 3,
                pb: 3,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <img 
                src="/promptvault_logo.jpg" 
                alt="PromptVault Logo" 
                style={{ 
                  height: '40px',
                  width: 'auto',
                  borderRadius: '8px'
                }} 
              />
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                    : 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                PromptVault
              </Typography>
            </Stack>
            
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

            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                mt: 2,
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              Prompt Builder
            </Typography>

            <PromptBuilder
              parts={promptParts}
              setParts={setPromptParts}
            />

            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                mt: 2,
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
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
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
