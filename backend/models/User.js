const mongoose = require('mongoose'),
Schema = mongoose.Schema;


const UserModel = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    first_name:  {type: String, required: true},
    last_name:  {type: String, required: true},
    favorited_recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]

})

const User = mongoose.model('User', UserModel)

module.exports = User