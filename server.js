const express = require('express')
const errorHandler = require('./middleware/errorhandler')
const connectDb = require('./config/dbConnection')
const dotenv = require('dotenv').config()

// connect with database
connectDb()

// initialize the express server
const app = express()

// allocated the port 
const port = process.env.PORT || 5000 

// middle ware 
app.use(express.json())
app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api/users', require("./routes/userRoutes"))
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`server is running on ${port}`)
})