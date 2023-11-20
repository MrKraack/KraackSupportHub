const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    userID: {type: String, default: null},
    userName: {type: String, default: null},
    userPassword: {type: String, default: null},
    userEmail: {type: String, default: null},
    userRole: {type: String, default: null},
    userTickets: [{type: String}],
    token: { type: String }
},
{collection: "Users"})

const userModel = mongoose.model("userModel", UserSchema)

module.exports = userModel