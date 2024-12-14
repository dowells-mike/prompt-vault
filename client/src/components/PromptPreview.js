import React from 'react';

const PromptPreview = ({ parts }) => {
  const fullPrompt = parts.filter(part => part.trim() !== '').join(' '); 

  return (
    <div>
      <h3>Full Prompt:</h3>
      <p>{fullPrompt}</p>
    </div>
  );
};

export default PromptPreview;