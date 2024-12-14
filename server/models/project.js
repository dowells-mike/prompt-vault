const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompts: [{
    parts: [String],
    fullPrompt: { type: String, required: false },
    images: [String] 
  }]
});

module.exports = mongoose.model('Project', projectSchema);