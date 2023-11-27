const BusinessModel = require("../../models/BusinessModel")
const bcrypt = require("bcrypt")


module.exports = async (req, res) => {
    //Get value from body
    let {
        reqBusinessName,
        reqBusinessOwner,
        reqBusinessWebsite,
        reqBusinessUsername,
        reqBusinessPassword
    } = req.body

    try {
        //count documents/business in database
        let businessCount = await BusinessModel.countDocuments({type: BusinessModel}).exec();
        businessCount++
        let newBusinessID = `business${businessCount}`

        //Encrypt the password
        let encryptedPassword = await bcrypt.hash(reqBusinessPassword, 10)

        //Assign variables to new object
        let newBusiness = new BusinessModel({
            BusinessID: newBusinessID,
            BusinessName : reqBusinessName,
            BusinessOwner: reqBusinessOwner,
            BusinessWebsite: reqBusinessWebsite,
            BusinessUsername: reqBusinessUsername,
            BusinessPassword: encryptedPassword
        })        

        newBusiness.save();
        res.status(200).json(`Business ${reqBusinessName} has been created`)


    } 
    catch (err) {
        console.log(err)

    }




}