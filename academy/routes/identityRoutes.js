const express = require('express');
const router = express.Router();
const taskController = require('../controllers/identityController');

router.post('/login', taskController.login);
router.post('/register', taskController.register);

module.exports = router;