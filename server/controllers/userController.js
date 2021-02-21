const { fail } = require('assert');
const User = require('../models/User');
const authSchema = require('../validation');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto')

exports.signUp = async (req, res, next) => {
    const { name, username, email, password } = req.body;
    try {

        //check if user already exists 
        const doesExists = await User.findOne({ email });
        if (doesExists) {
            return next(new errorMiddleware('email is taken already', 404));
        };
        const result = await authSchema.validateAsync({ name, username, email, password });
        const user = new User(result);
        await user.save()
        res.status(201).json({ success: true, user });


    } catch (error) {
        console.log(error.message);
        next(error);
    }

};
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
}

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
        console.log(err);
        return res.status(500).json({ sucess: false, msg: "server error" })
    }
}


