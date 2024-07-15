const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace
} = require('../controllers/workspaceController');

router.post('/', auth, createWorkspace);
router.get('/', auth, getWorkspaces);
router.get('/:id', auth, getWorkspace);
router.put('/:id', auth, updateWorkspace);
router.delete('/:id', auth, deleteWorkspace);

module.exports = router;