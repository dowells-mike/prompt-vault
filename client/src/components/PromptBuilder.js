import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { styled } from '@mui/material/styles';
import { Paper, IconButton, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

const SortablePromptPart = ({ id, content, onDelete, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <StyledPaper ref={setNodeRef} style={style}>
      <IconButton {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </IconButton>
      <TextField
        fullWidth
        value={content}
        onChange={(e) => onUpdate(id, e.target.value)}
        variant="outlined"
        size="small"
      />
      <IconButton onClick={() => onDelete(id)} color="error">
        <DeleteIcon />
      </IconButton>
    </StyledPaper>
  );
};

const PromptBuilder = ({ parts, setParts }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setParts((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id) => {
    setParts(parts.filter(part => part.id !== id));
  };

  const handleUpdate = (id, newContent) => {
    setParts(parts.map(part => 
      part.id === id ? { ...part, content: newContent } : part
    ));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={parts.map(part => part.id)}
          strategy={verticalListSortingStrategy}
        >
          {parts.map((part) => (
            <SortablePromptPart
              key={part.id}
              id={part.id}
              content={part.content}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default PromptBuilder;
