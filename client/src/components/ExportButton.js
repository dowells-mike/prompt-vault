import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Paper, 
  Button, 
  Snackbar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Typography 
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CodeIcon from '@mui/icons-material/Code';
import MarkdownIcon from '@mui/icons-material/Article';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  display: 'flex',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}));

const ExportButton = ({ projectName, fullPrompt, images }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createMarkdown = () => {
    let markdown = `# ${projectName || 'Untitled Project'}\n\n`;
    markdown += `## Prompt\n\n${fullPrompt}\n\n`;
    
    if (images && images.length > 0) {
      markdown += '## Reference Images\n\n';
      images.forEach((image, index) => {
        markdown += `![Image ${index + 1}](${image.data})\n\n`;
      });
    }
    
    return markdown;
  };

  const createJSON = () => {
    return JSON.stringify({
      projectName: projectName || 'Untitled Project',
      prompt: fullPrompt,
      images: images ? images.map(img => ({
        name: img.name,
        data: img.data
      })) : []
    }, null, 2);
  };

  const handleExport = (format) => {
    try {
      const element = document.createElement('a');
      let content = '';
      let filename = `${projectName || 'prompt'}`;
      let type = 'text/plain';

      switch (format) {
        case 'txt':
          content = fullPrompt;
          filename += '.txt';
          break;
        case 'json':
          content = createJSON();
          filename += '.json';
          type = 'application/json';
          break;
        case 'md':
          content = createMarkdown();
          filename += '.md';
          type = 'text/markdown';
          break;
        default:
          content = fullPrompt;
          filename += '.txt';
      }

      const file = new Blob([content], { type });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setSnackbarMessage(`Exported as ${format.toUpperCase()} successfully!`);
      setSnackbarOpen(true);
      handleClose();
    } catch (err) {
      setSnackbarMessage('Failed to export prompt');
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
          onClick={handleExportClick}
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
          Export As
        </Button>
      </StyledPaper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '8px',
            mt: 1
          }
        }}
      >
        <MenuItem onClick={() => handleExport('txt')}>
          <ListItemIcon>
            <TextSnippetIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Text File (.txt)</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport('json')}>
          <ListItemIcon>
            <CodeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">JSON File (.json)</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport('md')}>
          <ListItemIcon>
            <MarkdownIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Markdown (.md)</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

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
