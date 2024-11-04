const express = require('express');
const router = express.Router();

const validatePassword = require('../validators/validatePassword');
const validateEmail = require('../validators/validateEmail');
const identityController = require('../controllers/identityController');

router.post('/login', [validateEmail, validatePassword], identityController.login);
router.post('/register', [validateEmail, validatePassword], identityController.register );

module.exports = router;