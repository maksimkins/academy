const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/authenticateToken');
const homeworkController = require('../controllers/homeworkController');
const authorizeRole = require('../utils/authorizeRole');


router.post('/', [authenticateToken, authorizeRole('Teacher')], homeworkController.createHomework);
router.post('/upload', [authenticateToken, authorizeRole('User'), homeworkController.upload.single('file')], homeworkController.uploadHW);

module.exports = router;