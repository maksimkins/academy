const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/authenticateToken');
const userController = require('../controllers/userController');
const validateUserUpdate = require('../validators/validateUserUpdate');

router.get('/about', [authenticateToken], userController.about);
router.get('/getAvatar', [authenticateToken], userController.getAvatar);
router.put('/setAvatar', [authenticateToken], userController.setAvatar);
router.put('/', [authenticateToken, validateUserUpdate], userController.update)

module.exports = router;