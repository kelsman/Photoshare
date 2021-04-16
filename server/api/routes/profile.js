const express = require('express');
const profileController = require('../../controllers/profileController')
const authMiddleWare = require('../../middleware/auh');

const { upload } = require('../../utils/multer');
const router = express.Router();

// change avatar route 
router.put('/change-avatar', [authMiddleWare, upload.single('avatar')], profileController.changeAvatar)
router.put('/edit-profile', authMiddleWare, profileController.editProfile);
router.put('/changePassword', authMiddleWare, profileController.changePassword);
module.exports = router;