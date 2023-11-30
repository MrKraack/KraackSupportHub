const TicketModel = require('../../models/TicketModel')

module.exports = async (req, res) => {
    try {

        // Logik for at finde alle todos
        // let tickets = await TicketModel.find();

        // res.json(tickets)

        const userRole = req.roles;

        // Perform role-based authorization
        if (userRole === 1432) {
            // Fetch all tickets for admins
            console.log("admin access")
            let allTicket = TicketModel.find({TicketModel})
            return allTicket
            // ...
            res.json({ message: 'Admin: All tickets fetched' });
        } else if (userRole === 'user') {
            // Fetch only user-specific tickets
            console.log("user access")
            // ...
            res.json({ message: 'User: Specific tickets fetched' });
        } else {
            // Handle other roles or unexpected scenarios
            res.status(403).json({ error: 'Unauthorized' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}