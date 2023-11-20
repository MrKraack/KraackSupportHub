const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    TicketID: { type: String, default: null },
    TicketTitel: { type: String, default: null },
    TicketDescription: { type: String, default: null },
    TicketState: { type: String, default: null },
    TicketDueDate: { type: Date, default: null },
    TicketAssigned: { type: String, default: null },
    TicketCreated: { type: Date, default: null },
    TicketPriority: { type: String, default: null },
    TicketCreatedBy: { type: String, default: null },
    TicketCategory: { type: String, default: null },
    TicketSubCategory: { type: String, default: null },
    TicketComments: [{type: String}]
},{collection: "Tickets"})

const ticketModel = mongoose.model('ticketModel', ticketSchema)

module.exports = ticketModel