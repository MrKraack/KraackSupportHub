const TicketModel = require('../../models/TicketModel')

module.exports = async (req, res) => {
    try {
       

        let ticketByID = req.params.id
        // Logik for at finde alle todos
        let ticket = await TicketModel.findOne({TicketID: ticketByID})

        let userData = {
            theTicket: ticket,
            userRole: req.roles
        }
        res.json(userData)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}