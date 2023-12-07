const express = require("express")


//User
const userRegisterRoute = require('./routes/userRoutes/createUserRoute')
const userLoginRoute = require('./routes/userRoutes/userLoginRoute')
const readUserIDRoute = require('./routes/userRoutes/readUserByIDRoute')
const readUserRoute = require('./routes/userRoutes/readUsersRoute')
const deleteUserRoute = require("./routes/userRoutes/deleteUserRoute")


//Tickets
const createTicketRoute = require('./routes/TicketRoutes/createTicketRoute')
const readTicketsRoute = require('./routes/TicketRoutes/readTicketsRoute')
const readTicketByIDRoute = require('./routes/TicketRoutes/readTicketByIDRoute')
const deleteTicketsRoute = require('./routes/TicketRoutes/deleteTicketByIDRoute')
const updateTicketRoute = require('./routes/TicketRoutes/updateTicketRoute')
const readTicketsByUsernameRoute = require("./routes/TicketRoutes/readTicketsByNameRoute")

// Businesses
const createBusinessRoute = require('./routes/businessRoutes/createBusinessRoute')
const readBusinessRoute = require('./routes/businessRoutes/readBusinessRoute')
const readBusinessByIDRoute = require('./routes/businessRoutes/readBusinessByIDRoute')
const deleteBusinessesRoute = require('./routes/businessRoutes/deleteBusinessRoute')
const updateBusinessRoute = require('./routes/businessRoutes/updateBusinessRoute')

//Auth / Middleware
const verifyJWTRoute = require("./routes/middleware/verifyJWT")
const refrestTokenRoute = require("./routes/middleware/refreshTokenRoute")
const cookieVerify = require("./routes/middleware/cookieVerifyRoute")
const cookieInfoRoute = require("./routes/middleware/cookieInfoRoute")
// const cookieInfoRoute = require("../Server/routes/middleware/cookieInfoRoute")

// Routes defineres her
const router = express.Router()



//User routes
router.post('/register', userRegisterRoute)
router.post('/login', userLoginRoute)
router.get('/user/:id', readUserIDRoute)
router.get('/users', readUserRoute)
router.delete('/user/:id', deleteUserRoute)


//Ticket routes
router.post('/tickets/create', createTicketRoute)
router.get('/tickets', verifyJWTRoute, readTicketsRoute) 
router.get('/ticket/:id', verifyJWTRoute, readTicketByIDRoute)
router.get('/tickets/:id', readTicketsByUsernameRoute)
router.put('/tickets/:id', updateTicketRoute)
router.delete('/tickets/:id', deleteTicketsRoute)

//Business Routes
router.post('/business/create', createBusinessRoute)
router.get('/business', readBusinessRoute)
router.get('/business/:id', readBusinessByIDRoute)
router.put('/business/:id', updateBusinessRoute)
router.delete('/business/:id', deleteBusinessesRoute)

//Auth Routes
router.get('/refresh', refrestTokenRoute)
router.get("/cookieVerify", cookieVerify)
router.get("/cookieInfo", cookieInfoRoute)




module.exports = router