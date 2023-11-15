const mongoose = require("mongoose")

const TicketSchema = mongoose.Schema({
    TicketID: { type: Number, default: null },
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

const TicketModel = mongoose.model('tickets', TicketSchema)

module.exports = TicketModel