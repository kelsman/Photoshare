const express = require('express');
const router = express.Router();
const Post = require('../../models/post')
const User = require('../../models/user');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const auth = require('../../middleware/user');

//configure cloudinary 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "photoshare-photos",
    allowedFormats: ['jpg', 'jpeg', 'png', "mp4"],
    transformations: [{ width: 960, height: 960, crop: "limit" }],
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        callback(undefined, name);
    }

});
const parser = multer({ storage: storage });

// @route    POST api/posts
// @desc     ceate post
// @access   Private


router.post('/', [auth, parser.single("image")], async (req, res) => {
    try {
        // console.log(req.file) // to see what is returned to me
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.json({ msg: "no file selected" })
        }


        const result = await cloudinary.uploader.upload(file.path)
        if (!result) {
            return res.status(400).json("error in uploading file")
        }
        const { public_id, secure_url, } = result;

        //save post to mongodb
        const post = await new Post({
            postedBy: req.user,
            postImg: secure_url,
            cloudinary_id: public_id,
            caption: req.body.caption

        });

        await post.save((err) => {
            if (err) {
                return res.json(err)
            }
            res.status(200).json({ success: true, post });
        })


    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, msg: err.message });
    }
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private


router.get('/', auth, async (req, res) => {

    try {
        const post = await Post.find({}).populate("postedBy", "email").sort({ createdAt: -1 });
        if (!post) {
            return res.status(404).json({ msg: 'Posts not found' });
        }
        res.status(201).json(post)
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" + ":" + err });
    }

});

// @route    GET api/posts
// @desc     Get  posts by a user
// @access   Private

router.get('/:postId', auth, async (req, res) => {
    const postId = req.params.postId;
    try {

        //find post 
        const post = await Post.findById(postId).sort({ createdAt: -1 });

        if (!post) {
            return res.json({ msg: "no post found" });
        }
        //check for authenticated user 
        if (post.postedBy._id.toString() !== req.user) {
            return res.status(401).json({ msg: "not authenticated" });

        };
        res.json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "server error",
            errro: err.message
        })
    }
});

// @route    GET api/posts/myposts
// @desc     Get  posts by a user
// @access   Private

router.get('/mypost/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        //check if user is logged in 
        const user = await User.findOne(req.user);
        if (!user) {
            return res.status(401).json({ msg: "user not found" });

        };
        //find the user posts 
        const post = await Post.find({ id });
        if (id.toString() !== req.user) {
            return res.status(401).json({ msg: "user not authorised" });

        }
        if (!post) {
            return res.json({ msg: "no post found" });
        }
        res.json("post deleted");



    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "server error",
            errro: err.message
        })
    }

})



// @route    DELETE api/posts/myposts
// @desc     delete a post 
// @access   Private
router.delete('/mypost/:postId', auth, async (req, res) => {

    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        };
        //check if user is the owner of post to be deleted
        if (post.postedBy.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorised' });
        };
        //delete picture from cloudinary 
        await cloudinary.uploader.destroy(post.cloudinary_id);
        //delete post from database 

        await post.remove((err) => {
            if (!err) {
                return res.json({ msg: "post deleted" });
            }
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).send('Server Error');
    }


});




module.exports = router