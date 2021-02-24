
const express = require('express');
const authController = require('../../controllers/userController');
const authMiddleWare = require('../../middleware/auh');
const router = express.Router();

const { upload } = require('../../utils/multer');
// req Post
// desc Sign up user
// access Public
router.post('/register', upload.single('avatar'), authController.signUp);
router.post('/login', authController.signIn);
router.get('/getUser', authMiddleWare, authController.getUser);
router.post('/forgetpassword', authController.forgetPassword);
router.put('/resetpassword/:resetToken', authController.resetPassword);

module.exports = router;
