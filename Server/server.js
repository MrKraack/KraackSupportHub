const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./router')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors(
    {
    origin: "*"
    }
))

app.use(router)

// Uncomment this to connect to MongoDB
mongoose.connect(process.env.MONGO_ENDPOINT).then(() => {
     console.log('server connected, port8081')
     app.listen(8081)
})