import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Button, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  display: 'flex',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}));

const ExportButton = ({ projectName, fullPrompt }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt);
      setSnackbarMessage('Prompt copied to clipboard!');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Failed to copy prompt');
      setSnackbarOpen(true);
    }
  };

  const handleDownload = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([fullPrompt], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${projectName || 'prompt'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setSnackbarMessage('Prompt downloaded successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Failed to download prompt');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <StyledPaper>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          disabled={!fullPrompt}
          fullWidth
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            }
          }}
        >
          Copy to Clipboard
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={!fullPrompt}
          fullWidth
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            }
          }}
        >
          Download as Text
        </Button>
      </StyledPaper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default ExportButton;
