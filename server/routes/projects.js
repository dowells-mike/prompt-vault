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

// @route   GET api/projects
// @desc    Get all projects
router.get('/', async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// @route   GET api/projects/:id
// @desc    Get a project by ID
router.get('/:id', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id).populate('prompts');
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route   PUT api/projects/:id
// @desc    Update a project
router.put('/:id', async (req, res) => {
    try {
      const { name } = req.body;
  
      let project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      project.name = name || project.name;
  
      await project.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// @route   DELETE api/projects/:id
// @desc    Delete a project
router.delete('/:id', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      // Optionally delete associated prompts if stored separately
      // await Prompt.deleteMany({ project: req.params.id });
  
      await project.remove();
      res.json({ msg: 'Project removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// ... (Add more routes for GET, PUT, DELETE later)

module.exports = router;