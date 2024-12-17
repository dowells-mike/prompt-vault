import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)',
  },
}));

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <StyledIconButton
        onClick={onToggle}
        color="inherit"
        aria-label="toggle theme"
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </StyledIconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
