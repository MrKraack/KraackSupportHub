const TicketModel = require('../../models/TicketModel')

module.exports = async (req, res) => {
    try {

        console.log("readTicketCookies: ")
        console.log(req.roles)
        console.log(req.user)
        // Logik for at finde alle todos
        // let tickets = await TicketModel.find();

        // res.json(tickets)
        const userName = req.user;
        const userRole = req.roles;

   
        if (userRole === 1432) {
            // Fetch all tickets for admins
            console.log("admin access")
            let allTicket = await TicketModel.find({TicketModel})
            res.json(allTicket)
   
        } else if (userRole === 7326) {
            // Fetch only user-specific tickets
            console.log("user access")
            let userTickets = await TicketModel.find({TicketCreatedBy: userName})
            console.log("userTickets: ")
            console.log(userTickets)
            res.json(userTickets)
            // ...
        } else {
            // Handle other roles or unexpected scenarios
            res.status(403).json({ error: 'Unauthorized' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}