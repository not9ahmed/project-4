// Import Modules
const isLoggedIn = require('../helper/isLoggedIn')
const express = require('express'),
router = express.Router(),
userController = require('../controllers/users')


// Authentication
router.post('/auth/signup', userController.createUser)
router.post('/auth/login', userController.loginUser)


// Admin
router.get('/admin/users', userController.getAllUsers)


// User Specific Routes 
router.get('/user/:_id', userController.getUserById)
router.put('/user/:_id', userController.updateUser)

// router.get('/user/recipes', isLoggedIn, userController.getUsersRecipes)


module.exports = router