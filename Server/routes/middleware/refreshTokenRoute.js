const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    let cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log("Cookies JWT: ")
    console.log(cookies.jwt)
    let refreshToken = cookies.jwt;
    try {
        const userObject = await UserModel.findOne({ refreshToken: refreshToken });

        if (!userObject) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || userObject.userName !== decoded.UserInfo.userName) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo":
                        {
                            "userName": decoded.UserInfo.userName,
                            "roles": decoded.UserInfo.roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "5m" }
                );
                res.json({ accessToken });

            }
        )

    }


    catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
