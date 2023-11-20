const UserModel = require("../../models/UserModel")

module.exports = async (req, res) => {
    //Getting userID from params

    let reqUserID = req.params.id;

    try {
        let currentUserObject = await UserModel.find({})

        res.json(currentUserObject)

            
        

    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }

    


}