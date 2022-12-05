const express = require('express')
const router = express.Router()
const recipesController = require('../controllers/recipes')


// Recipes
router.post('/recipe', recipesController.createRecipe)
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
router.post('/favorite-recipe/:_id', recipesController.favoriteRecipe)

module.exports = router