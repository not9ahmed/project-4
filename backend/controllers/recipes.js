const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const jwt_decode = require('jwt-decode')
const User = require('../models/User')
const Recipe = require('../models/Recipe')
const Ingredient = require('../models/Ingredient')

const createRecipe = async (req, res) => {
    // console.log("this is the create food function!!!")
    // console.log("Request headers:")
    // const user = jwt_decode(req.headers.authorization)
    // console.log(user)

    // console.log(req.body)

    try {
        // const idOfUser = user.user.id


        let recipeImages = req.body.images

        let ingredients = req.body.ingredients

        // images = []
        if (recipeImages === undefined){
            recipeImages = []
        } else {
            recipeImages.forEach(element => {
                element = mongoose.Types.ObjectId(element)
            });
        }

        if (ingredients === undefined){
            ingredients = []
        } else {
            ingredients.forEach(element => {
                element = mongoose.Types.ObjectId(element)
            });
        }

        const newRecipe = await Recipe.create({
            name_en: req.body.name_en,
            name_ar: req.body.name_ar,
            description_en: req.body.description_en,
            description_ar: req.body.description_ar,
            images: recipeImages,
            ingredients: ingredients

        })


        return res.json({message: "Recipe got created"})

    } catch(err) {
        return res.json({error: "Error -> " + err}).status(400);
    }

}


const getAllRecipes = async (req, res) => {
    
    try {
        
        const allRecipes = await Recipe.find({}).populate(['ingredients'])
        
        return res.send(allRecipes)
        
    } catch (err) {
        return res.json(err)
    }
}


const getRecipeById = async (req,res) => {
    try{
        const recipe = await Recipe.findById(req.params.id).populate(['ingredients', 'users_favorited'])
        return res.json(recipe)
    } catch(err){
        return res.json(err)
    }
}
const updateRecipe = async (req, res) => {
    try {

        let updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params._id,
            req.body
        )

        console.log(updatedRecipe)
        return res.json('Recipe updated')

    } catch (err) {
        return res.json(err)
    }
}

const deleteRecipe = async (req, res) => {

    try {
        await Recipe.findByIdAndDelete(
            req.params._id
            )
        return res.json({message: 'Recipe Deleted Successfully'})

    } catch (err) {
        return res.json(err)
    }
}



const createIngredient = async (req, res) => {
    try {

        let newIngredient = await Ingredient.create({
            name_en: req.body.name_en,
            name_ar: req.body.name_ar,
            quantity: req.body.quantity
        })

        res.json(newIngredient)
    
    }catch (err){
        res.json(err)
    }
}


const getAllIngredients = async (req, res) => {
    try {

        let allIngredients = await Ingredient.find({})

        return res.json(allIngredients)

    }catch(err) {
        return res.json(err)
    }
}

const getIngredientById = async (req, res) => {

    try {
        const ingredient = await Ingredient.findById(req.params.id);
        return res.json(ingredient);
    } catch(err){
        return res.json(err)
    }
}

const updateIngredient = async (req, res) => {
    try {

        let updatedIngredient = await Ingredient.findByIdAndUpdate(
            req.params._id,
            req.body
        )

        console.log(updatedIngredient)
        return res.json('Ingredient Updated')

    } catch (err) {
        return res.json(err)
    }
}


const deleteIngredient = async (req, res) => {

    try {
        await Ingredient.findByIdAndDelete(
            req.params._id
            )
        return res.json({message: 'Recipe Deleted Successfully'})

    } catch (err) {
        return res.json(err)
    }
}




const favoriteRecipe = async (req, res) => {

    const user = jwt_decode(req.headers.authorization)

    const idOfUser = user.user.id

    try {

        // get the user
        let userDb = await User.findById(mongoose.Types.ObjectId(idOfUser))

        // get thecrecipe
        let recipe = await Recipe.findById(
            req.params._id,
        )

        recipe.users_favorited.push(userDb._id)
        await recipe.save()

        userDb.favorited_recipes.push(recipe._id)
        await userDb.save()

        return res.json({message: 'Recipe Got Favorited Successfully'})

    } catch (err) {
        return res.json(err)
    }
}


const removeFavoriteRecipe = async (req, res) => {

    const user = jwt_decode(req.headers.authorization)

    const idOfUser = user.user.id

    try {

        // get the user
        // let userDb = await User.findById(mongoose.Types.ObjectId(idOfUser))

        // get the recipe
        // let recipe = await Recipe.findById(
        //     req.params._id,
        // )

        const userDb = await User.findByIdAndUpdate(
            ObjectId(userDb._id),
            { $pull: { favorited_recipes: ObjectId(req.params._id) } },
            { new: true }
        )

        
        const recipe = await Recipe.findByIdAndUpdate(
                req.params._id,
                { $pull: { users_favorited: ObjectId(userDb._id) } },
                { new: true }
            )
            
            
            
            
        // recipe.users_favorited.push(userDb._id)
        // await recipe.save()

        // userDb.favorited_recipes.push(recipe._id)
        // await userDb.save()

        return res.json({message: 'Recipe Got Unfavorited Successfully'})

    } catch (err) {
        return res.json(err)
    }
}


module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
    favoriteRecipe,
    removeFavoriteRecipe
}