const TicketModel = require('../../models/TicketModel');
const jwt = require("jsonwebtoken")
// const UserModel = require("../../models/UserModel");


module.exports = async (req, res) => {
    //Taking all properties from body
    let {
        reqTicketTitel,
        reqTicketDescription,
        reqTicketState,
        reqTicketDueDate,
        reqTicketAssigned,
        reqTicketPriority,
        reqTicketCreatedBy,
        reqTicketCategory,
        reqTicketSubCategory,
        reqTicketComments } = req.body


    //Get the last element in todo Tasks and get the id from it
    //Search database for objects matching TicketModel
    let ticketCount = await TicketModel.countDocuments({type: TicketModel}).exec();
    
    // //Increment the ID
    ticketCount++;
    let newTicketID = `Ticket${ticketCount}`;
    
    let cookie = req.cookies.jwt

    try {
     

        // Get current Date
        const currentDate = new Date();
        const currentDateFormat = currentDate.toLocaleString(); // f.eks. 23/11/2023, 17.39
        //Regex to match after the comma
        const pattern = /(?<=, )[^,]+/;
        //Match regex against currentDateFormat
        const match = currentDateFormat.match(pattern);
        const originalDateAndTime = currentDateFormat.split(', ')[0];
        const extractedValue = match[0];
        const result = `${originalDateAndTime}, KL:${extractedValue.replace(/\.\d+$/, '')}`;

        //Get userName from Cookie
        let decoded = jwt.verify(cookie, process.env.REFRESH_TOKEN_SECRET);
        let userName = decoded.UserInfo.userName;

        console.log("This is decoded from create Ticket: ")
        console.log(decoded)
       

        //Create newTicket using values from req.query
        let newTicket = new TicketModel({
            TicketID: newTicketID,
            TicketTitel: reqTicketTitel,
            TicketDescription: reqTicketDescription,
            TicketState: reqTicketState,
            TicketDueDate: reqTicketDueDate,
            TicketAssigned: reqTicketAssigned,
            TicketCreated: result,
            TicketPriority: reqTicketPriority,
            TicketCreatedBy: userName,
            TicketCategory: reqTicketCategory,
            TicketSubCategory: reqTicketSubCategory,
            TicketComments: reqTicketComments

        });

        await newTicket.save();
        res.json(newTicket);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}