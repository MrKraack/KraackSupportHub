const BusinessModel = require("../../models/BusinessModel")
const bcrypt = require("bcrypt")


module.exports = async (req, res) => {

    //Get ID from Params
    let reqBusinessID = req.params.id
    //Get the updated info from req.body
    let { reqBusinessName,
        reqBusinessOwner,
        reqBusinessWebsite,
        reqBusinessUsername,
        reqBusinessPassword
    } = req.body

    try {
        //get the current business object from DB
        let businessObjectFromDB = await BusinessModel.findOne({ BusinessID: reqBusinessID })

        // Check if user wants to update the password
        if (reqBusinessPassword) {
            console.log("password detected")
            //Encrypt the password

            let encryptedPassword = await bcrypt.hash(reqBusinessPassword, 10)
            let updateModelWithPassword = {
                BusinessName: reqBusinessName,
                BusinessOwner: reqBusinessOwner,
                BusinessWebsite: reqBusinessWebsite,
                BusinessUsername: reqBusinessUsername,
                BusinessPassword: encryptedPassword
            }
            //Update object on MongoDB
            const result = await BusinessModel.updateOne(businessObjectFromDB, updateModelWithPassword);
        }
        else {
            //update the Object without password 
            let updateModel = {
                BusinessName: reqBusinessName,
                BusinessOwner: reqBusinessOwner,
                BusinessWebsite: reqBusinessWebsite,
                BusinessUsername: reqBusinessUsername,
            }
             //Update object on MongoDB
            const result = await BusinessModel.updateOne(businessObjectFromDB, updateModel);

        }
        res.status(200).json(`Business ${businessObjectFromDB.BusinessName} has been updated`)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }


}