const BusinessModel = require("../../models/BusinessModel")

module.exports = async(req,res) => {
    
    try {    
        //Get the id from params
        businessToDeleteID = req.params.id

        //Search for Business and delete that object
        await BusinessModel.findOneAndDelete({BusinessID: businessToDeleteID})

        res.status(200).json(`Business with id ${businessToDeleteID} has been deleted`)
        
    } 
    catch
     (err) {
        res.status(400).json(err)
        
    }
    



}