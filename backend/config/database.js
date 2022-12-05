const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL)



mongoose.connection.on('connected', () => {
    console.log('Connected on database!')
})