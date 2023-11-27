const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: { type: String, default: null },
    creator: { type: String, default: null },
    createdDate: { type: String, default: null },
  }, { _id: false });

const ticketSchema = new mongoose.Schema({
    TicketID: { type: String, default: null },
    TicketTitel: { type: String, default: null },
    TicketDescription: { type: String, default: null },
    TicketState: { type: String, default: null },
    TicketDueDate: { type: Date, default: null },
    TicketAssigned: { type: String, default: null },
    TicketCreated: { type: String, default: null },
    TicketPriority: { type: String, default: null },
    TicketCreatedBy: { type: String, default: null },
    TicketCategory: { type: String, default: null },
    TicketSubCategory: { type: String, default: null },
    TicketComments: [commentSchema],
},{collection: "Tickets"})

const ticketModel = mongoose.model('ticketModel', ticketSchema)

module.exports = ticketModel