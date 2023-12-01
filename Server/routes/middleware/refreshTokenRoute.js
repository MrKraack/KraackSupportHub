const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userObject = await UserModel.findOne({ refreshToken: refreshToken });
            console.log("refreshTokenRoute triggered:")
            console.log("refreshTokenUser: ")
            console.log(userObject)

            if (!userObject) {
                console.log("User not found");
                throw new Error('User not found');
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                console.log("First decoded: ")
                console.log(decoded)
                if (err || userObject.userName !== decoded.UserInfo.userName) {
                    reject(new Error('Invalid refresh token'));
                } else {
                    console.log("refreshDecoded: ")
                    console.log(decoded)
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

                    console.log("This is accessToken: ");
                    console.log(newAccessToken);

                    resolve(newAccessToken);
                }
            });
        } catch (error) {
            console.error('Refresh token error:', error.message);
            reject(error);
        }
    });
};
