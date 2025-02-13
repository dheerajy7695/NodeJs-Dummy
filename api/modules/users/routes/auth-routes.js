const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');
const isUserAuthenticated = require('../../../core/middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgetPassword);
router.post('/reset-password/:id/:token', authController.resetPassword);

module.exports = router;