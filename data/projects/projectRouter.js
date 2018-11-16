const express = require('express');
const router = express.Router();
const projectsDb = require('../helpers/projectModel.js');
const actionsDb = require('../helpers/actionModel.js');

//ENDPOINTS
// /api/projects

//all projects
router.get('/', (req, res) => {
  projectsDb.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "projects not retrievable"})
    })
});

// post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectsDb.get(id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "project information could not be retrieved"})
    })
});

// get project actions
router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  projectsDb.getProjectActions(id)
    .then(project => {
      res.status(200).json(project)
    })

})

// create/add post
router.post('/', (req, res) => {
  projectsDb.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({ error: "error adding project", err })
    })
});

//update post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projectsDb.update(id, changes)
    .then(project => {
      if(project) {
        res.status(200).json({ message: 'project updated!' })
      } else {
        res.status(404).json({ message: 'project not found' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating project"})
    })
});

router.delete('/:id', (req, res) => {
  projectsDb.remove(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json({ message: 'error deleting project' })
    })
})

module.exports = router;