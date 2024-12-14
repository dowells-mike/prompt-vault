const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompts: [{
    parts: [String],
    fullPrompt: String,
    images: [String] 
  }]
});

module.exports = mongoose.model('Project', projectSchema);