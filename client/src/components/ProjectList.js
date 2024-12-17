import React from 'react';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  overflow: 'hidden'
}));

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  borderLeft: `4px solid ${selected ? theme.palette.primary.main : 'transparent'}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderLeft: `4px solid ${theme.palette.primary.light}`,
  }
}));

const ProjectList = ({ projects, selectedProject, onSelectProject, onDeleteProject }) => {
  return (
    <StyledPaper elevation={2}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        Projects
      </Typography>
      <List sx={{ p: 0 }}>
        {projects.map((project) => (
          <StyledListItem
            key={project._id}
            selected={selectedProject?._id === project._id}
            onClick={() => onSelectProject(project)}
            secondaryAction={
              <IconButton 
                edge="end" 
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject(project._id);
                }}
                sx={{
                  '&:hover': {
                    color: 'error.main',
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={project.name}
              primaryTypographyProps={{
                sx: {
                  fontWeight: selectedProject?._id === project._id ? 600 : 400
                }
              }}
            />
          </StyledListItem>
        ))}
        {projects.length === 0 && (
          <ListItem>
            <ListItemText
              primary="No projects yet"
              sx={{ textAlign: 'center', color: 'text.secondary' }}
            />
          </ListItem>
        )}
      </List>
    </StyledPaper>
  );
};

export default ProjectList;
