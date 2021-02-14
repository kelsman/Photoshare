const express = require('express');

const router = express.Router();
const auth = require('../../middleware/user');
const Post = require('../../models/post');
const Like = require('../../models/like');
const comment = require('../../models/comment');
//like a post 

router.post('/:postId', auth, async (req, res) => {

    const { postId } = req.params;


    try {
        //find the post first 
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({ error: 'Could not find a post with that post id.' })
        };
        const user = await User.findById(req.user)
        if (!user) {
            return res.status(404).send({ error: 'Could not find a user with that user id' })
        }
        const like = await new Like({
            authorId: req.user,
            postId,
            authorPicture: user.displayPicture,
            authorName: user.username
        });
        await like.save((err) => {
            if (!err) {
                return res.status(201).json({ success: true, like });
            }
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
});


module.exports = router;