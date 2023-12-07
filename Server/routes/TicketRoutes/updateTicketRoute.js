const ticketModel = require("../../models/TicketModel")
module.exports = async (req, res) => {

    //Get id from params
    let theTicketID = req.params.id

    //Get the variables
    let {
        TicketTitel,
        TicketDescription,
        TicketState,
        TicketDueDate,
        TicketAssigned,
        TicketPriority,
        TicketCategory,
        TicketSubCategory,
        TicketComments
    } = req.body.ticketData



    try {

        //Update Ticket with new info from updateVariable
        const updateModel = {
            TicketTitel: TicketTitel,
            TicketDescription: TicketDescription,
            TicketState: TicketState,
            TicketDueDate: TicketDueDate,
            TicketAssigned: TicketAssigned,
            TicketPriority: TicketPriority,
            TicketCategory: TicketCategory,
            TicketSubCategory: TicketSubCategory,
            TicketComments: TicketComments

        }




        //Save Ticket
        let result = await ticketModel.updateOne({ TicketID: theTicketID }, updateModel);

        res.status(200)

    }
    catch (err) {
        
        res.status(500).json({ error: err.message });
    }

}