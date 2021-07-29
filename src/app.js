const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyparser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config({ path: __dirname + '/config.env' })
const connectDB = require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()

// set port value given in config.env
const port = process.env.PORT || 8080

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.json())

// log request
app.use(morgan('tiny'))

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine
app.set("view engine", "hbs")

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// handlebar methods used for dynamic paging
hbs.handlebars.registerHelper("setChecked", function (value, currentValue) {
    if (value == currentValue) {
        return "checked";
    } else {
        return "";
    }
})

hbs.handlebars.registerHelper("sliceDate", function (value) {
    return value.slice(0, 10)
})

// load routers
app.use(userRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})