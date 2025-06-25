const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/userController');
const { adminAuth } = require('../middleware/auth');

router.get('/', adminAuth, getAllUsers);

module.exports = router;