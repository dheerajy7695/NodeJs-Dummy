const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/getUser', userController.getUsers);
router.post('/create-user', userController.createUser);
router.post('/loginUser', userController.loginUser);
router.get('/getById/:userId', userController.getUserById);
router.get('/getByUsername/:username', userController.getUserByUsername);
router.delete('/delete-user/:userId', userController.deleteUser);
router.get('/user/getCount', userController.getUserCounts);

router.patch('/update/:id', userController.updateUser);
router.get('/getUserByEmail/:email', userController.getUserByEmail);

module.exports = router;