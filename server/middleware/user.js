const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jsonSecret

module.exports = auth = async (req, res, next) => {
    //check fot token
    const token = req.headers["x-auth-token"] || req.body.token || req.query.token
    try {
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        //if token. verify token
        await jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                console.log(err.message)
                return res.status(500).json("error in verifying token" + ":" + err.message)
            };

            req.user = decoded.user;
            next()
        })

    } catch (err) {
        console.error('something wrong with auth middleware');
    }
}