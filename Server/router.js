const express = require("express")

// Routes importeres her

//User
// const userRegisterRoute = require('./routes/user/postUser')
// const userLoginRoute = require('./routes/user/authUser')
// const userIsAuth = require('./routes/user/isAuth') //to authenticate, that user is logged in, when trying to go to page
// const updateUser = require('./routes/user/updateUser')


//Tickets
const createTicketRoute = require('./routes/TicketRoutes/createTicketRoute')
const readTicketsRoute = require('./routes/TicketRoutes/ReadTicketsRoute')
const readTicketByIDRoute = require('./routes/TicketRoutes/ReadTicketByIDRoute')
const deleteTicketsRoute = require('./routes/TicketRoutes/DeleteTicketByIDRoute')
// const updateTodoRoute = require('./routes/todos/updateTodosRoute')



// Example route



const router = express.Router()

// Routes defineres her

// const tokenAuth = require('./middleware/tokenAuth')

//User routes
// router.post('/register', userRegisterRoute)
// router.post('/login', userLoginRoute)
// router.put('/updateUser/:id', updateUser)


//Todos routes
// router.post('/todos/get', tokenAuth, readTodosRoute)
router.post('/tickets/create', createTicketRoute)
router.get('/tickets', readTicketsRoute)
router.get('/tickets/:id', readTicketByIDRoute)
// router.put('/tickets/:id', updateTicketsRoute)
router.delete('/tickets/:id', deleteTicketsRoute)



module.exports = router