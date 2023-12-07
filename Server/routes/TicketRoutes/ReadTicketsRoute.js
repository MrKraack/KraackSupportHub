const TicketModel = require('../../models/TicketModel')

module.exports = async (req, res) => {
    try {

        

        // res.json(tickets)
        const userName = req.user;
        const userRole = req.roles;

   
        if (userRole === 1432) {
            // Fetch all tickets for admins
           
            let allTicket = await TicketModel.find({TicketModel})
            let responseData = {
                Tickets: allTicket,
                role: userRole
            }
            res.json(responseData)
   
        } else if (userRole === 7326) {
            // Fetch only user-specific tickets
            
            let userTickets = await TicketModel.find({TicketCreatedBy: userName})
            
            let responseData = {
                Tickets: userTickets,
                role: userRole
            }
            res.json(responseData)
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