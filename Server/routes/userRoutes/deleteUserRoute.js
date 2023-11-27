const UserModel = require("../../models/UserModel")

module.exports = async (req, res) => {

    //get user id from params
    let currentUserID = req.params.id

    try {
        
        //Find user object
        await UserModel.findOneAndDelete({userID: currentUserID})
    
        
        
        res.status(200).json("Users is deleted")

    } 
    catch (err) {
        res.status(400).json(err)
    }



}