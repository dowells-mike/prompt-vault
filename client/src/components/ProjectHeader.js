import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}));

const ProjectHeader = ({ projectName, setProjectName, onSave, onAddPart }) => {
  return (
    <StyledPaper>
      <TextField
        fullWidth
        label="Project Name"
        variant="outlined"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddPart}
          startIcon={<AddIcon />}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            }
          }}
        >
          Add Part
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onSave}
          startIcon={<SaveIcon />}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            }
          }}
        >
          Save Project
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default ProjectHeader;
