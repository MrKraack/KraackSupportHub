// const TicketModel = require('../../models/TicketModel')
const TicketModel = require("../../models/TicketModel")

module.exports = async (req, res) => {
    try {

        let ticketID = req.params.id
        console.log("ticket delete Id: ")
        console.log(ticketID)


        let ticket = await TicketModel.findOneAndDelete({TicketID: ticketID});
        console.log("this is ticket: ")
        console.log(ticket)
        
        if(!ticket) {
            return res.status(404).json({msg: "Ticket not found"})
        }

        ticket 
        res.status(200).json(`ticket ${ticketID} deleted`)


    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
