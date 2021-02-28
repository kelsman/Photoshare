const User = require('../models/User');
const { cloudinary } = require('../utils/cloudinary');

const Post = require('../models/Post')

// @ create a post 
exports.createPost = async (req, res, next) => {

    const { caption } = req.body;
    const file = req.file.path
    try {
        const upload = await cloudinary.uploader.upload(file, {
            use_filename: true,
            folder: "photoshare_post",
            resource_type: 'auto',
        });
        if (upload) {

            const post = await new Post({
                postedBy: req.user.id,
                caption,
                postMedia: upload.secure_url,
                cloudinary_id: upload.public_id,
            });
            await post.save((err) => {
                if (!err) {
                    res.status(201).json({ success: true, post })
                }
            })
        }

    } catch (error) {
        res.status(500).json({ sucess: false, msg: `failed to make post : ${error.message}` })
        next()
    }


}
// @ like a post 
exports.likePost = async (req, res, next) => {

    try {
        // find the post 
        const post = await Post.findById(req.params.id)

        //  check if post has been liked before

        const isLiked = await post.likes.find((like) => {
            like.likedBy.toString() === post.postedBy.toString()
        });
        if (isLiked) {
            return res.json({ msg: "post has been liked already" })
        }
        //  if not add the like to the post
        post.likes.unshift(req.user.id);

        post.save((err) => {
            if (!err) {
                return res.status(201).json({ sucess: true, msg: "liked" })
            }
        });


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ sucess: false, msg: ` something went wrong` })
        next()
    }

};

exports.unlikePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        //  check if post has been liked before

        const isLiked = await post.likes.find((like) => {
            like.likedBy.toString() === post.postedBy.toString()
        });
        if (!isLiked) {
            return res.json({ success: false, msg: "You haven't liked this post" })
        };
        // remove the like from the post array
        post.likes.filter((like) => {
            like._id.toString() !== req.user.id.toString()
        });
        post.save((err) => {
            if (!err) {
                return res.status(201).json({ sucess: true, msg: "unliked success" })
            }
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ sucess: false, msg: ` something went wrong` })
        next();
    }
}