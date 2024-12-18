const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// Define Routes
app.use('/api/projects', require('./routes/projects'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof SyntaxError && err.status === 413) {
    return res.status(413).json({ 
      message: 'Request entity too large. Image size should be less than 50MB.' 
    });
  }
  res.status(500).json({ message: 'Something broke!' });
});

// 404 handler (only for non-production)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
