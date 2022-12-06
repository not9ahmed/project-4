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
router.get('/user/recipes', isLoggedIn, userController.getUsersRecipes)


router.post('/users/:userId', userController.updateUser)

router.get('/users/:userId', userController.getUserById)


module.exports = router