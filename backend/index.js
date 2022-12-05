// Importing the required modules
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000

// Connecting to DB
require('./config/database')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// specifying the routes
app.use('/', require('./routes/users'))
app.use('/', require('./routes/recipes'))


// Running on the port 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})