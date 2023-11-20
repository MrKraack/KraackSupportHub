const BusinessModel = require("../../models/BusinessModel")

module.exports = async(req,res) => {
    
    //Load all business from database
try {
    let allBusinessObject = await BusinessModel.find();
    
        res.json(allBusinessObject);
    
} 
catch (err) {
    res.status(400).json({error: err.message})
    
}


}