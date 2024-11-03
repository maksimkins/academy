const express = require('express');
const router = express.Router();

const validatePassword = require('../validators/validatePassword');
const validateEmail = require('../validators/validateEmail');
const taskController = require('../controllers/identityController');

router.post('/login', [validateEmail, validatePassword], taskController.login);
router.post('/register', [validateEmail, validatePassword], taskController.register );

module.exports = router;