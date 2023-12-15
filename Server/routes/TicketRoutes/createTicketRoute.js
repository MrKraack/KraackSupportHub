const TicketModel = require('../../models/TicketModel');
const jwt = require("jsonwebtoken")
// const UserModel = require("../../models/UserModel");

module.exports = async (req, res) => {
    //Taking all properties from body
    let {
        reqTicketTitel,
        reqTicketDescription,
        reqTicketDueDate,
        reqTicketPriority,
        reqTicketCategory,
        reqTicketSubCategory,
        reqTicketComments } = req.body


    //Search database for objects matching TicketModel
    let ticketCount = await TicketModel.countDocuments({ type: TicketModel }).exec();

    // //Increment the ID
    ticketCount++;
    let newTicketID = `Ticket${ticketCount}`;

    let cookie = req.cookies.jwt

    try {


        // Get current Date
        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months starts at 0, so add 1
        const year = currentDate.getFullYear();

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        // If data is a number from 1 to 9, add a 0 in front
        const formattedDay = day < 10 ? `0${day}` : day; 
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        const currentDateFormat = `${formattedDay}/${formattedMonth}/${year}, KL:${formattedHours}.${formattedMinutes}`;

        //Get userName from Cookie
        let decoded = jwt.verify(cookie, process.env.REFRESH_TOKEN_SECRET);
        let userName = decoded.UserInfo.userName;


        //Create newTicket using values from req.body
        let newTicket = new TicketModel({
            TicketID: newTicketID,
            TicketTitel: reqTicketTitel,
            TicketDescription: reqTicketDescription,
            TicketState: "Unassigned",
            TicketDueDate: reqTicketDueDate,
            TicketAssigned: "Unassigned",
            TicketCreated: currentDateFormat,
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