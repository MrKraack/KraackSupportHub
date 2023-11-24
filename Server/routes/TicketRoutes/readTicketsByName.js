const UserModel = require("../../models/UserModel")

module.exports = async (req,res) => {
    //Get username from Req
    let currentUsername = req.body.reqUserName;


    try {

        //Load all tickets, that have the same createdBy 
        let userTickets = await UserModel.find({userName: reqUserName})

        res.status(200).json(userTickets)
        
    } 
    
    catch (error) {
        
    }


}