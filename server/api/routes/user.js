
const express = require('express');
const authController = require('../../controllers/userController');
const authMiddleWare = require('../../middleware/auh');
const router = express.Router();

// req Post
// desc Sign up user
// access Public
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.post('/forgetpassword', authController.forgetPassword);
router.put('/resetpassword/:resetToken', authController.resetPassword);

module.exports = router;
