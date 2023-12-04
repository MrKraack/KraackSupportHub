const jwt = require("jsonwebtoken");
const refreshTokenLogic = require("./refreshTokenRoute");

module.exports = async (req, res, next) => {
    console.log("logging VerifyJWT");

    const tokenCookie = req.cookies.jwt;
    
   

    if (!tokenCookie) return res.sendStatus(401);
   

    try {
        const accessToken = await refreshTokenLogic(tokenCookie);
      

        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    console.error('Token verification error:', err.message);
                    return res.sendStatus(403); // Not a valid token
                }
           
                req.user = decoded.UserInfo.userName;
                req.roles = decoded.UserInfo.roles;
                next();
            }
        );
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
