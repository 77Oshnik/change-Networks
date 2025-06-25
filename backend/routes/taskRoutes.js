const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  getTasks,
  getTaskStats,
  createTask,
  updateTask,
  deleteTask
} = require('../controller/taskController');

router.get('/', auth, getTasks);
router.get('/stats', auth, getTaskStats);

router.post('/', [
  adminAuth,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('assignedTo').notEmpty().withMessage('Assigned user is required'),
], createTask);

router.put('/:id', auth, updateTask);
router.delete('/:id', adminAuth, deleteTask);

module.exports = router;