const mongoose = require('mongoose')

const schema = mongoose.Schema

const UserModel = new schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const User = mongoose.model('User', UserModel)

module.exports = User