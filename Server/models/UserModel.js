const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    userID: {type: String, default: null},
    userName: {type: String, default: null, unique: true},
    userPassword: {type: String, default: null},
    userEmail: {type: String, default: null, unique: true},
    userRole: {type: Number, default: null},
    userTickets: [{type: String}],
    accessToken: { type: String },
    refreshToken: { type: String }
},
{collection: "Users"})

const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel