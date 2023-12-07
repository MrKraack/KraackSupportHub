const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./router')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()

app.use(cookieParser())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors({
    credentials: true,
    origin: ["http://localhost:8080", "http://localhost:8081", "https://support-hub-tau.vercel.app", "3.75.158.163"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(router)

mongoose.connect(process.env.MONGO_ENDPOINT).then(() => {
    console.log('server connected, port8081')
    app.listen(8081)
})