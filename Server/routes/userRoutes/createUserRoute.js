const UserModel = require("../../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    //Get all variables from body
    let { reqUserName, reqUserPassword, reqUserEmail } = req.body

    //count documents in database
    let userCount = await UserModel.countDocuments({ type: UserModel }).exec();

    // //Increment the ID
    userCount++;
    let newUserID = `user${userCount}`;


    try {
        //Check if username already exists 
        const existingUser = await UserModel.findOne({ userName: reqUserName });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        //Encrypt password using Bcrypt hashing
        let encryptedPassword = await bcrypt.hash(reqUserPassword, 10)

        let newUser = new UserModel({
            userID: newUserID,
            userName: reqUserName,
            userPassword: encryptedPassword,
            userEmail: reqUserEmail,
            userRole: 7326,
        })

        // Create token
        const token = jwt.sign(
            {
                "UserInfo": {
                    "userName": newUser.userName,
                    "roles": newUser.userRole
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "30s",
            }
        );
        // save user token
        newUser.accessToken = token;

        newUser.save();
        res.status(200).json("User has been created");

    }
    catch (err) {
        console.log(err)

    }



}