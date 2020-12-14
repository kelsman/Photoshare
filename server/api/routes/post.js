// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const auth = require('../../middleware/user');
// const Post = require('../../models/post');
// const User = require('../../models/user');
// const multer = require('multer');

// //REQUEST POST 
// //@desc create a post
// // access Private

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './upload');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.origianlname)
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpg" | file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         //reject string a file 
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,

// })
// router.post('/', [auth, upload.single(postImg)], async (req, res) => {

//     //check if user is loggedin/authenticated
//     try {
//         const { caption } = req.body;
//         const user = await User.findById(req.user).select(["-password", "-password2"]);
//         if (!user) {
//             return res.status(500).json({ msg: "not authenticated" })
//         }
//         const newPost = {
//             postedBy: user.username,
//             imgName: req.file
//         }
//         const post = new Post()
//     } catch (err) {

//     }
// });

// module.exports = router;