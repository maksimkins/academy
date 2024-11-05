const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/authenticateToken');
const homeworkController = require('../controllers/homeworkController');
const authorizeRole = require('../utils/authorizeRole');


router.post('/', [authenticateToken, authorizeRole('Teacher')], homeworkController.createHomework);

module.exports = router;