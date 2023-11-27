const mongoose = require("mongoose")

const businessSchema = new mongoose.Schema({
    BusinessID: {type: String, default: null},
    BusinessName: {type: String, default: null},
    BusinessOwner: {type: String, default: null},
    BusinessWebsite: {type: String, default: null},
    BusinessUsername: {type: String, default: null},
    BusinessPassword: {type: String, default: null}
}, {collection: "Business"})

const businessModel = mongoose.model("businessModel", businessSchema)

module.exports = businessModel;