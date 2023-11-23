const UserModel = require("../../models/UserModel")
const bcrypt = require("bcrypt")

module.exports = async (req, res ) => {

    //Get all variables from body
    let { reqUserName, reqUserPassword, reqUserEmail } = req.body

    // //Search database for objects matching UserModel
    // const userCounter = await UserModel.find({ UserModel });

    //count documents in database
    let userCount = await UserModel.countDocuments({type: UserModel}).exec();
    
    // //Increment the ID
    userCount++;
    let newUserID = `user${userCount}`;

    try {

       console.log(userCount)
        //Encrypt password using Bcrypt hashing
        let encryptedPassword = await bcrypt.hash(reqUserPassword, 10)
        console.log("This is password: " + reqUserPassword)
        console.log("This is encrypted password: ")
        console.log( encryptedPassword)

        let newUser = new UserModel({
            userID: newUserID,
            userName: reqUserName,
            userPassword: encryptedPassword,
            userEmail: reqUserEmail,
            userRole: "user",
        })

        newUser.save();
        res.status(200).json("User has been created");

    }
    catch (err) {
        console.log(err)

    }



}