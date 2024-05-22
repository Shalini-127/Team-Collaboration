// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

let projects = [];
let nextProjectId = 1;

app.use(express.json());
app.use(cors());

// Get all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Get a specific project by id
app.get('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(project => project.id === id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(project);
});

// Create a new project
app.post('/projects', (req, res) => {
  const { title, description } = req.body;
  const newProject = { id: nextProjectId++, title, description };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Update an existing project by id
app.put('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }
  const { title, description } = req.body;
  projects[projectIndex] = { id, title, description };
  res.json(projects[projectIndex]);
});

// Delete an existing project by id
app.delete('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }
  projects.splice(projectIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
