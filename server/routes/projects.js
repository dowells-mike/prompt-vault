const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// @route   POST api/projects
// @desc    Create a project
router.post('/', async (req, res) => {
  try {
    const { name, prompts } = req.body;
    const newProject = new Project({
      name,
      prompts: prompts || []
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
    const projects = await Project.find().sort({ createdAt: -1 });
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
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/projects/:id
// @desc    Update a project
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: { name } },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects/:id/prompts
// @desc    Add a prompt to a project
router.post('/:id/prompts', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { parts, fullPrompt, images } = req.body;
    project.prompts.push({ parts, fullPrompt, images });
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/projects/:id/prompts/:promptId
// @desc    Update a prompt
router.put('/:id/prompts/:promptId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const prompt = project.prompts.id(req.params.promptId);
    if (!prompt) {
      return res.status(404).json({ msg: 'Prompt not found' });
    }

    const { parts, fullPrompt, images } = req.body;
    if (parts) prompt.parts = parts;
    if (fullPrompt) prompt.fullPrompt = fullPrompt;
    if (images) prompt.images = images;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invalid ID' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/projects/:id/prompts/:promptId
// @desc    Delete a prompt
router.delete('/:id/prompts/:promptId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const promptIndex = project.prompts.findIndex(
      prompt => prompt._id.toString() === req.params.promptId
    );
    
    if (promptIndex === -1) {
      return res.status(404).json({ msg: 'Prompt not found' });
    }

    project.prompts.splice(promptIndex, 1);
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invalid ID' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
