const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/authenticateToken');
const groupController = require('../controllers/groupController');
const authorizeRole = require('../utils/authorizeRole');


router.post('/', [authenticateToken, authorizeRole('Admin')], groupController.createGroup);
router.delete('/', [authenticateToken, authorizeRole('Admin')], groupController.deleteGroup);
router.post('/addToGroup', [authenticateToken, authorizeRole('Admin')], groupController.addToGroup);
router.delete('/deleteFromGroup', [authenticateToken, authorizeRole('Admin')], groupController.deleteFromGroup);

module.exports = router;