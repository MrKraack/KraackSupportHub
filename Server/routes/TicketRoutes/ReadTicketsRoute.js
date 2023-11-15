const TicketModel = require('../../models/TicketModel')

module.exports = async (req, res) => {
    try {
        // Logik for at finde alle todos
        let ticket = await TicketModel.find();

        res.json(ticket)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}