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


// @route   POST api/projects/:projectId/prompts
// @desc    Add a new prompt to a project
router.post('/:projectId/prompts', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      const { parts, fullPrompt, images } = req.body;
  
      // Add the new prompt to the project's prompts array
      const newPrompt = { parts, fullPrompt, images };
      project.prompts.push(newPrompt);
  
      await project.save();
      res.json(project); // Return the updated project
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// @route   PUT api/projects/:projectId/prompts/:promptId
// @desc    Update a prompt under a project
router.put('/:projectId/prompts/:promptId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      const prompt = project.prompts.id(req.params.promptId);
      if (!prompt) {
        return res.status(404).json({ msg: 'Prompt not found' });
      }
  
      // Update prompt fields
      const { parts, fullPrompt, images } = req.body;
      if (parts) prompt.parts = parts;
      if (fullPrompt) prompt.fullPrompt = fullPrompt;
      if (images) prompt.images = images;
  
      await project.save();
      res.json(prompt); // Return the updated prompt
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route   DELETE api/projects/:projectId/prompts/:promptId
// @desc    Delete a prompt under a project
router.delete('/:projectId/prompts/:promptId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      const prompt = project.prompts.id(req.params.promptId);
      if (!prompt) {
        return res.status(404).json({ msg: 'Prompt not found' });
      }
  
      // Remove the prompt from the prompts array
      prompt.remove();
  
      await project.save();
      res.json({ msg: 'Prompt removed', project }); // Return the updated project
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route   GET api/projects/:projectId/prompts
// @desc    Get all prompts under a project
router.get('/:projectId/prompts', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      res.json(project.prompts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route   GET api/projects/:projectId/prompts/:promptId
// @desc    Get a prompt by ID under a project
router.get('/:projectId/prompts/:promptId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      const prompt = project.prompts.find((prompt) => prompt._id.toString() === req.params.promptId);
      if (!prompt) {
        return res.status(404).json({ msg: 'Prompt not found' });
      }
  
      res.json(prompt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;