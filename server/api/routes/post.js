const express = require('express');
const authMiddleWare = require('../../middleware/auh');
const postController = require('../../controllers/postController');
const { upload } = require('../../utils/multer');
const router = express.Router();

// @create a post
router.post('/createPost', [authMiddleWare, upload.single('postfile')], postController.createPost);
// @like a post
router.put('/likePost/:postid', authMiddleWare, postController.likePost);
// @unlike a post
router.put('/unlikePost/:id', authMiddleWare, postController.unlikePost);
// @comment on a post
router.post('/comment/:postId', authMiddleWare, postController.commentPost);
// @delete a comment
router.put('/deleteComment/:id/:comment_id', authMiddleWare, postController.deleteComment);
// @delete a post
router.delete('/deletePost/:id', authMiddleWare, postController.deletePost)

//  @get a single post by the post id
router.get('/singlePost/:postId', authMiddleWare, postController.getSinglePost);

//  @get user posts 
router.get('/myPosts', authMiddleWare, postController.getPosts);

//  @get all posts for explore page 
router.get('/allPosts', authMiddleWare, postController.allPosts);

module.exports = router;