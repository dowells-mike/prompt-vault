import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography, TextField } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}));

const PreviewText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontWeight: 500
}));

const PromptPreview = ({ parts, fullPrompt, setFullPrompt }) => {
  useEffect(() => {
    // Combine all non-empty parts with a space
    const combinedPrompt = parts
      .map(part => part.content.trim())
      .filter(content => content !== '')
      .join(' ');
    
    setFullPrompt(combinedPrompt);
  }, [parts, setFullPrompt]);

  return (
    <StyledPaper>
      <PreviewText variant="h6">
        Full Prompt Preview
      </PreviewText>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={fullPrompt}
        onChange={(e) => setFullPrompt(e.target.value)}
        variant="outlined"
        placeholder="Your combined prompt will appear here..."
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            '&:hover': {
              backgroundColor: '#f3f4f6',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
            }
          }
        }}
      />
    </StyledPaper>
  );
};

export default PromptPreview;
