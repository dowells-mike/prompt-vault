const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  data: String // Base64 encoded image data
});

const promptSchema = new mongoose.Schema({
  parts: [String],
  fullPrompt: String,
  images: [imageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prompts: [promptSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
