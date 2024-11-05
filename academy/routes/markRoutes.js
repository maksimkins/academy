const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/authenticateToken');
const markController = require('../controllers/markController');
const authorizeRole = require('../utils/authorizeRole');


router.post('/set', [authenticateToken, authorizeRole('Teacher')], markController.setMark);

module.exports = router;