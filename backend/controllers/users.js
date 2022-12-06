const User = require('../models/User')
const Recipe = require('../models/Recipe')
const jwt_decode = require('jwt-decode')
const bcrypt = require('bcrypt');
const salt = 10;

const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    
    try{
        let hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            favorited_recipes: req.body.favorited_recipes
        })

        return res.json(newUser);

    }catch (err){
        return res.json(err)
    }
}



const loginUser = async (req, res) => {
    let {email, password} = req.body;
    try{
        let user = await User.findOne({email});

        console.log(user)

        if(!user){
            return res.json({error: "User not found!"}).status(400);
        }

        const isMatch = await bcrypt.compareSync(password, user.password);

        if(!isMatch){
            return res.json({error: "Password not matched!"}).status(401);
        }

        const payload = {
            user: {
                id: user._id,
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: 36000000},
            (err ,token) => {
                if(err) throw err;
                //returns token as an object >>>>  {token : <token value>}
                return res.json({token}).status(200)
            }
        )

    } catch (err){
        return res.json({error: "You are not loggedin, please try again later!"}).status(400);
    }
}


const getAllUsers = async (req, res) => {
    
    try {
        const users = await User.find()

        return res.json(users)

    }catch (err){
        return res.json(err);
    }
}


const getUserById = async (req, res) => {


    const idOfUser = req.params._id
    
    try {
        const user = await User.findById(idOfUser)
        return res.json(user)

    }catch (err){
        return res.json(err);
    }
}

const updateUser = async (req, res) => {

    const idOfUser = req.params._id
    
    try {

        const updatedData = req.body
        const updatedUser = await User.findByIdAndUpdate(idOfUser, updatedData)

        return res.json(updatedUser)

    }catch (err){
        return res.json(err)
    }
}



// const getUsersRecipes = async (req, res) => {


//     const user = jwt_decode(req.headers.authorization)
//     console.log(user)

//     const idOfUser = user.user.id

//     try {

//        const user = await User.findById(mongoose.Types.ObjectId(idOfUser)).populate('recipes')
       
//        return res.json(user.favorited_recipes)

//     }catch (err){
//         return res.json(err);
//     }
// }





module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser
    // getUsersRecipes
}