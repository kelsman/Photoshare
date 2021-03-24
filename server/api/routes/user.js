
const express = require('express');
const authController = require('../../controllers/userController');
const profileController = require('../../controllers/profileController')
const authMiddleWare = require('../../middleware/auh');
const router = express.Router();

const { upload } = require('../../utils/multer');
// req Post
// desc Sign up user
// access Public
router.post('/register', upload.single('avatar'), authController.signUp);
// log in a user
router.post('/login', authController.signIn);
//  get logged in user details
router.get('/getUser', authMiddleWare, authController.getUser);
// forget password
router.post('/forgetpassword', authController.forgetPassword);
//  reset password
router.put('/resetpassword/:resetToken', authController.resetPassword);

//  follow a user
router.post('/follow/:userid', authMiddleWare, authController.followUser);
//  unfollow a user
router.post('/unfollow/:userid', authMiddleWare, authController.unFollowUser);

// get suggested users
router.get('/suggestedUsers', authMiddleWare, authController.getSuggestedUsers);

//  get user profile 
router.get('/userprofile/:username', authMiddleWare, profileController.getUserProfile);

// search users 

router.post('/search-users/:query', authMiddleWare, authController.searchUsers);

module.exports = router;
