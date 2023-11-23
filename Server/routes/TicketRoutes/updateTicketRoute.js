const ticketModel = require("../../models/TicketModel")
module.exports = async (req, res) => {

    //Get id from params
    let theTicketID = req.params.id

    //Get the variables
    let {
        reqTicketTitel,
        reqTicketDescription,
        reqTicketState,
        reqTicketDueDate,
        reqTicketAssigned,
        reqTicketPriority,
        reqTicketCategory,
        reqTicketSubCategory,
        reqTicketComments
    } = req.body



    try {

        //Get the Ticket

        let currentTicketObject = await ticketModel.findOne({TicketID: theTicketID})

        //Update Ticket with new info from updateVariable
        const updateModel = {
            TicketTitel: reqTicketTitel,
            TicketDescription: reqTicketDescription,
            TicketState: reqTicketState,
            TicketDueDate: reqTicketDueDate,
            TicketAssigned: reqTicketAssigned,
            TicketPriority: reqTicketPriority,
            TicketCategory: reqTicketCategory,
            TicketSubCategory: reqTicketSubCategory,
            TicketComments: reqTicketComments
        }

        //Save Ticket
        const result = await ticketModel.updateOne(currentTicketObject, updateModel);    

        res.status(200).json(`${currentTicketObject.TicketTitel} has been updated`)
        
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

}