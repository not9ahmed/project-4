const mongoose = require('mongoose'),
Schema = mongoose.Schema;



const IngredientModel = new Schema({
    name_en: {type: String, required: true},
    name_ar: {type: String, required: true},
    quantity_en: {type: String, required: true},
    quantity_ar: {type: String, required: true},
}, {
    timestamps: true
})


// Storing our schema as a model
const Ingredient = mongoose.model('Ingredient', IngredientModel)


// exporting our Model
module.exports = Ingredient


/*
    reserved: [{
    type: Schema.Types.ObjectId,
    ref: 'Food'
}]



    // reference the location table
    location: {type: mongoose.Types.ObjectId, ref: "Location"},
*/