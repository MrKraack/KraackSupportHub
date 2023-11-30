const UserModel = require("../../models/UserModel")

module.exports = async(req,res) => {
    //Get user Object ID
    let userObjectId = req.body.objectID
    
    try {
        //find user based on ObjectID
        let currentUser = UserModel.findOne({ObjectId: userObjectID })

        


    }
     catch (error) {
        
    }




},