import React from 'react';

const PromptPart = ({ part, index, updatePart, deletePart }) => {
  return (
    <div>
      <input
        type="text"
        value={part}
        onChange={(e) => updatePart(index, e.target.value)}
      />
      <button onClick={() => deletePart(index)}>Delete</button>
    </div>
  );
};

export default PromptPart;