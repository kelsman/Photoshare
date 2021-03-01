
const User = require('../models/User');
const authSchema = require('../validation');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');


const { cloudinary } = require('../utils/cloudinary');





// @ sign up a new user 
exports.signUp = async (req, res, next) => {
    const { name, username, email, password } = req.body;

    try {
        //check if user already exists 
        const doesExists = await User.findOne({ email });
        if (doesExists) {
            return res.status(404).json({ success: false, msg: "Email is already taken" });
        };
        //if user doesn't exist we validate the user inputs 
        await authSchema.validateAsync(req.body);

        //  upload to cloudinary
        const upload = await cloudinary.uploader.upload(req.file.path, {
            folder: "avatars",
            use_filename: true,
            allowed_formats: ["jpeg", 'png', 'gif']
        });
        if (!upload) {
            return res.status(401).json({ success: false, msg: "error in saving profile-picture" })
        }

        const user = new User({
            name,
            username,
            email,
            password,
            avatar: upload.secure_url,
            cloudinary_id: upload.public_id
        });
        await user.save()
        res.status(201).json({ success: true, msg: "account created successfully" });


    } catch (error) {
        console.log(error.message);
        next(error);
    }

};

// @sign in a user

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //check if user exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: `user with ${email} doesn't exists` })
        };

        // check if password matches 
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "Invalid Credentials" });
        };
        // create a jwt token 
        const jwtToken = await user.generateToken();
        res.status(201).json({ success: true, jwtToken });


    } catch (error) {
        console.log(error);
        res.status(500).send("server error" + error.message)
        next(error);
    }
};

// get signed in user 
exports.getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, msg: "unauthorised" })
        };
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "server error" + ":" + error.message });
        next(error)
    }
};





//@forget password
exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, response: "no account found with this email" })
        };
        // set up url that will include the resetpassword token;
        const resetToken = user.getPasswordResetToken();

        await user.save();

        const resetUrl = `http://localhost:9000/${resetToken}`
        const message = `
        <h1> You have requested a password reset </h1>
        <p> please click on the link below </p>
        <a href= ${resetUrl}> ${resetUrl}</a>
        `

        await sendEmail({

            to: email,
            subject: 'password reset',
            text: message
        });
        res.status(200).json({ success: true, data: "Email Sent", email: message });
    } catch (error) {
        console.log(error.message);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save();
        return res.status(500).json({ success: false, error: "email could not be sent" });
    }
}
//@ reset password
exports.resetPassword = async (req, res, next) => {

    // compare token from the url 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");


    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }

        });
        if (!user) {
            return res.status(400).json({ success: false, error: "invalid Token" });
        };
        user.password = req.body.newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(201).json({
            sucess: true,
            msg: "password updated successfully"
        });


    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ sucess: false, msg: "server error" })

    }
}

//@ delete an account 




