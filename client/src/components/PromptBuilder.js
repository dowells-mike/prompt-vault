import React, { useState } from 'react';
import PromptPart from './PromptPart';

const PromptBuilder = ({ parts, setParts }) => {
  const addPart = () => {
    setParts([...parts, '']);
  };

  const updatePart = (index, value) => {
    const newParts = [...parts];
    newParts[index] = value;
    setParts(newParts);
  };

  const deletePart = (index) => {
    const newParts = parts.filter((_, i) => i !== index);
    setParts(newParts);
  };

  return (
    <div>
      {parts.map((part, index) => (
        <PromptPart
          key={index}
          part={part}
          index={index}
          updatePart={updatePart}
          deletePart={deletePart}
        />
      ))}
      <button onClick={addPart}>Add Part</button>
    </div>
  );
};

export default PromptBuilder;