const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { registerUser, loginUser, getMe,logoutUser } = require('../controller/authController');
const { auth } = require('../middleware/auth');

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], loginUser);

router.get('/me', auth, getMe);
router.post('/logout', logoutUser);


module.exports = router;