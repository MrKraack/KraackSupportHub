const TicketModel = require('../../models/TicketModel');
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

    console.log(req)

    //Get the last element in todo Tasks and get the id from it
    //Search database for objects matching TicketModel
    const ticketCounter = await TicketModel.find({ TicketModel });

    //Get the last element from array
    let lastTicketObject = ticketCounter.slice(-1);

    //Regex to get number from end of String
    let numberRegex = /\d+$/;

    //Use regex and convert string to Int
    let ticketIdFromDB = parseInt(lastTicketObject[0].TicketID.match(numberRegex));

    //Increment the ID
    ticketIdFromDB++;
    let newTaskID = `supportTicket${ticketIdFromDB}`;

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
        console.log(result);




        //

        // if (userID) {
        //     let userObject = await UserModel.findOne({ userID: userID });
        //     //push the taskboard into user taskboard array
        //     userObject.todos_id.push(taskTodoID);
        //     await userObject.save();
        // }

        //Create newTicket using values from req.query
        let newTicket = new TicketModel({
            TicketID: newTaskID,
            TicketTitel: reqTicketTitel,
            TicketDescription: reqTicketDescription,
            TicketState: reqTicketState,
            TicketDueDate: reqTicketDueDate,
            TicketAssigned: reqTicketAssigned,
            TicketCreated: result,
            TicketPriority: reqTicketPriority,
            TicketCreatedBy: reqTicketCreatedBy,
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