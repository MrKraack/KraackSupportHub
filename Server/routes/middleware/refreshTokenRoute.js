const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userObject = await UserModel.findOne({ refreshToken: refreshToken });

            if (!userObject) {
                throw new Error('User not found');
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
  
                if (err || userObject.userName !== decoded.UserInfo.userName) {
                    reject(new Error('Invalid refresh token'));
                } else {
                  
                    const newAccessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "userName": decoded.UserInfo.userName,
                                "roles": userObject.userRole
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "5m" }
                    );

                    

                    resolve(newAccessToken);
                }
            });
        } catch (error) {
            console.error('Refresh token error:', error.message);
            reject(error);
        }
    });
};
