import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography, IconButton, Box, ImageList, ImageListItem } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const DropZone = styled(Paper)(({ theme, isDragActive }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: isDragActive ? theme.palette.action.hover : theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.light,
  }
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover .delete-button': {
    opacity: 1,
  }
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 4,
  right: 4,
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  padding: 4,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  }
}));

const ImageUploader = ({ images, setImages }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prevImages => [...prevImages, {
          id: Date.now(),
          data: reader.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  }, [setImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxSize: 5242880 // 5MB
  });

  const handleDelete = (imageId) => {
    setImages(prevImages => prevImages.filter(img => img.id !== imageId));
  };

  return (
    <Box>
      <DropZone {...getRootProps()} isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <CloudUploadIcon fontSize="large" color={isDragActive ? "primary" : "action"} />
        <Typography variant="body1" color="textSecondary" align="center">
          {isDragActive
            ? "Drop images here..."
            : "Drag & drop images here, or click to select"}
        </Typography>
        <AddPhotoAlternateIcon fontSize="large" color="action" />
      </DropZone>

      {images.length > 0 && (
        <ImageList cols={3} gap={8}>
          {images.map((image) => (
            <ImageListItem key={image.id}>
              <ImagePreview>
                <img
                  src={image.data}
                  alt={image.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <DeleteButton
                  className="delete-button"
                  size="small"
                  onClick={() => handleDelete(image.id)}
                >
                  <DeleteIcon fontSize="small" />
                </DeleteButton>
              </ImagePreview>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default ImageUploader;
