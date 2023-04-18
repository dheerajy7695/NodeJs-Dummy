const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const isUserAuthenticated = require('../../../core/middleware/authMiddleware');
const userValidateSchema = require('../models/userValidateSchema');

const { userSchema } = require('../models/userSchema');

router.post('/loginUser', userController.loginUser);

router.post('/create-user', userValidateSchema(userSchema), userController.createUser);
router.patch('/update-user/:userId', userValidateSchema(userSchema), isUserAuthenticated, userController.updateUser);
router.delete('/delete-user/:userId', isUserAuthenticated, userController.deleteUser);

router.get('/getUser', isUserAuthenticated, userController.getUsers);
router.get('/user/getCount', isUserAuthenticated, userController.getUserCounts);

router.get('/getById/:userId', isUserAuthenticated, userController.getUserById);
router.get('/getByUsername/:username', isUserAuthenticated, userController.getUserByUsername);
router.get('/getUserByEmail/:email', isUserAuthenticated, userController.getUserByEmail);

module.exports = router;