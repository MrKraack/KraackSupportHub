const jwt = require("jsonwebtoken");
const refreshTokenLogic = require("./refreshTokenRoute");

module.exports = async (req, res) => {
    //Get Cookie
    const tokenCookie = req.cookies.jwt;

    //Send error if cookie isn't found
    if (!tokenCookie) return res.sendStatus(401);

    try {
        //Make new accessToken 
        const accessToken = await refreshTokenLogic(tokenCookie);
      
        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    console.error('Token verification error:', err.message);
                    return res.sendStatus(403); // Not a valid token
                }
                userInfo = {
                    user: decoded.UserInfo.userName,
                    roles: decoded.UserInfo.roles

                }                
                res.json(userInfo)
            }
        );
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
