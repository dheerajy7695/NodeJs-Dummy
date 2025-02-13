const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const isUserAuthenticated = require('../../../core/middleware/authMiddleware');

const { userSchema } = require('../models/userSchema');

router.post('/create', userController.create);
router.patch('/update/:id', isUserAuthenticated, userController.update);
router.delete('/delete/:id', isUserAuthenticated, userController.deleteUser);

router.get('/get', isUserAuthenticated, userController.getUsers);

module.exports = router;