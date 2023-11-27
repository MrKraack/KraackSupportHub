const BusinessModel = require("../../models/BusinessModel")

module.exports = async(req,res) => {
    //Get business ID from req.params
    let reqBusinessID = req.params.id
    
    //Load all business from database
try {
    let businessObject = await BusinessModel.findOne({BusinessID: reqBusinessID});
    
        res.json(businessObject);
    
} 
catch (err) {
    res.status(400).json({error: err.message})
    
}


}