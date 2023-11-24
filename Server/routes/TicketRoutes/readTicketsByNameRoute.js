const TicketModel = require("../../models/TicketModel")

module.exports = async (req, res) => {
    //Get username from Req
    let currentUsername = req.params.userName;
   


    try {

        //Load all tickets, that have the same createdBy 
        let userTickets = await TicketModel.find({TicketCreatedBy: currentUsername})

        res.json(userTickets)
    } 
    
    catch (error) {
        
    }


}