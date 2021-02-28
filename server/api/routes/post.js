const express = require('express');
const authMiddleWare = require('../../middleware/auh');
const postController = require('../../controllers/postController');
const { upload } = require('../../utils/multer');
const router = express.Router();


router.post('/createPost', [authMiddleWare, upload.single('postfile')], postController.createPost);
router.put('/likePost/:id', authMiddleWare, postController.likePost);
router.put('/unlikePost/:id', authMiddleWare, postController.unlikePost)
module.exports = router;