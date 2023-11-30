const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("logging VerifyJWT")
    
    const tokenCookie = req.cookies.accessToken;
    console.log(tokenCookie)

    if (!tokenCookie) return res.sendStatus(401);

    jwt.verify(
        tokenCookie,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err){
                console.error('Token verification error:', err.message);
                return res.sendStatus(403); // Not a valid token
            } 
            console.log("continue JWT.Verify")
            req.user = decoded.UserInfo.userName;
            req.roles = decoded.UserInfo.roles
            next();
        }
    );
};
