const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwtSecret = process.env.jsonSecret;
const auth = require('../../middleware/user');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { cloudinaryStorage, CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "photoshareDp",
    allowedFormats: ['jpg', 'jpeg', 'png', "mp4"],
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        callback(undefined, name);
    }
});

const parser = multer({ storage: storage });

// req Post
// desc Sign up user
// access Public

router.post('/signup', [[
    check('name', "name is required").not().isEmpty(),
    check('email', "please enter a valid email address").isEmail(),
    check('username', "username is required").not().isEmpty(),
    // password must be at least 5 chars long
    check('password', "password must be at least 5 chars long").isLength({ min: 5 }),
    check('password2', "password must be at least 5 chars long").isLength({ min: 5 })

], parser.single("profileImg")]
    , async (req, res) => {
        const { name, email, password, username, password2 } = req.body;
        const file = req.file;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!file) {
            res.json({ msg: "no image is selected" })
        }

        try {
            //check if user is already regusted
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "account already exist" })
            };
            //create a new User if account does'nt exists

            const uploadResult = await cloudinary.uploader.upload(file.path);
            const { public_id, secure_url } = uploadResult;
            const newUser = await new User({
                name,
                email,
                username,
                password,
                password2,
                cloudinary_id: public_id,
                displayPicture: secure_url
            });
            // hash password before saving to database
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            newUser.password2 = await bcrypt.hash(password2, salt);

            //save user to database
            await newUser.save((err) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).json({ success: false })
                }
                res.json({ msg: "user registered sucessfully", file })
            })
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ msg: "server error" })
        }

    });



// req Post
// desc Log in user
// access Public

router.post('/login', [
    check('email', "please enter a valid email address").isEmail(),
    // password must be at least 5 chars long
    check('password', "password must be at least 5 chars long").isLength({ min: 5 })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        //check if the user account exisrs
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "invalid credentials" });

        };
        //if user check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "invalid credentials" });
        }

        //create a token to authenticate

        const payload = {
            user: user.id
        };
        await jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
            if (err) {
                console.log(err.message)
                return res.status(500).json("server error")
            }
            res.json({ success: true, token })
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "server error" })
    }
});

// req Delete
// desc Delete account
// access Private

router.delete('/', [auth], async (req, res) => {


    try {
        await User.findByIdAndDelete(req.user, (err) => {
            if (err) return res.status(500).json("soemthing went wrong");
            res.json({ msg: "account deleted" });
        })
    } catch (err) {

        console.log(err.message);
        return res.status(500).json({ msg: "server error" });

    }
});

// req Get
// desc Get user by id
// access Private
router.get('/userInfo', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user }).select(["-password", "-password2"]);
        if (!user) {
            return res.status(404).json({ msg: "user isnt authenticated" });
        }
        res.json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "server error" + ":" + err.message })
    }

})

module.exports = router;