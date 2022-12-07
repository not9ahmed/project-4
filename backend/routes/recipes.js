const express = require('express')
const router = express.Router()
const recipesController = require('../controllers/recipes')
const multer = require('multer');
const upload = multer();

// Recipes
router.post('/recipe',upload.none(), recipesController.createRecipe)
router.get('/recipe', recipesController.getAllRecipes)
router.get('/recipe/:_id', recipesController.getRecipeById)
router.put('/recipe/:_id', recipesController.updateRecipe)
router.delete('/recipe/:_id', recipesController.deleteRecipe)


// Ingredients
router.post('/ingredient', recipesController.createIngredient)
router.get('/ingredient', recipesController.getAllIngredients)
router.get('/ingredient/:_id', recipesController.getIngredientById)
router.put('/ingredient/:_id', recipesController.updateIngredient)
router.delete('/ingredient/:_id', recipesController.deleteIngredient)


// Favorite Food
router.post('/favorite/add/:_id', recipesController.addFavorite)
router.delete('/favorite/remove/:_id', recipesController.removeFavorite)
router.get('/favorite', recipesController.getAllUserFavorites)


// Predict Food
router.post('/predict-food', recipesController.predictFood) 

module.exports = router