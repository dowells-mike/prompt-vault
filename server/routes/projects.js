const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// @route   POST api/projects
// @desc    Create a project
router.post('/', async (req, res) => {
  try {
    const { name, prompts } = req.body; // Extract name and prompts from request body
    const newProject = new Project({
      name: req.body.name,
      prompts: prompts || [] // Use provided prompts or default to an empty array
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ... (Add more routes for GET, PUT, DELETE later)

module.exports = router;