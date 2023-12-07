// const TicketModel = require('../../models/TicketModel')
const TicketModel = require("../../models/TicketModel")

module.exports = async (req, res) => {
    try {

        let ticketID = req.params.id
     


        let ticket = await TicketModel.findOneAndDelete({TicketID: ticketID});
      
        
        if(!ticket) {
            return res.status(404).json({msg: "Ticket not found"})
        }

       
        res.status(200).json(`ticket ${ticketID} deleted`)


    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
