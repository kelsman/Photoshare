const jwt = require('jsonwebtoken')
const secret = process.env.JwtSecret;

const authMiddleWare = async (req, res, next) => {

    const token = req.header("x-auth-token");
    if (!token) {
        res.status(401).json({ success: false, msg: "you're not authorised" })
    };
    try {
        // verify the token

        const decoded = await jwt.verify(token, secret);
        if (!decoded) {
            return res.status(500).json("error in verifying token" + ":" + err.message)
        };

        req.user = decoded.user;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: error.message })

    }
};
module.exports = authMiddleWare;