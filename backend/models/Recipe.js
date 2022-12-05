const mongoose = require('mongoose'),
Schema = mongoose.Schema;



const RecipeModel = new Schema({
    name_en: {type: String, required: true},
    name_ar: {type: String, required: true},
    description_en: {type: String, required: true},
    description_ar: {type: String, required: true},
    images: [String],
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    users_favorited: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})


// Storing our schema as a model
const Recipe = mongoose.model('Recipe', RecipeModel)


// exporting our Model
module.exports = Recipe


/*
    reserved: [{
    type: Schema.Types.ObjectId,
    ref: 'Food'
}]



    // reference the location table
    location: {type: mongoose.Types.ObjectId, ref: "Location"},
*/