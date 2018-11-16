const express = require('express');
const router = express.Router();
const actionsDb = require('../helpers/actionModel.js');

//ENDPOINTS
// /api/actions

//all actions
router.get('/', (req, res) => {
  actionsDb.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "projects not retrievable"})
    })
});

// actions by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  actionsDb.get(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "project information could not be retrieved"})
    })
});

// create/add action
router.post('/', (req, res) => {
  actionsDb.insert(req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({ error: "error adding action", err })
    })
});

//update action
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  actionsDb.update(id, changes)
    .then(action => {
      if(action) {
        res.status(200).json({ message: 'action updated!' })
      } else {
        res.status(404).json({ message: 'action not found' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating action"})
    })
});

//delete action
router.delete('/:id', (req, res) => {
  actionsDb.remove(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(500).json({ message: 'error deleting action' })
    })
})



module.exports = router;