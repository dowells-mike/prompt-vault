const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Link to parent project
  parts: [String],
  fullPrompt: { type: String, required: false },
  images: [String],
});

module.exports = mongoose.model('Prompt', promptSchema);