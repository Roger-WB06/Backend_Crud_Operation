const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// @desc Register the user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async(req,res)=> {
    const {username, email, password} = req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("All Field are required")
    }

    const userAvailable = await UserModel.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User Already Exist")
    }

    // hashed password
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
        username,
        email,
        password: hashPassword
    })

    if(user){
        res.status(201).json({_id: user._id, email: user.email})
    }
    else{
        res.status(400)
        throw new Error("User Data is not Valid")
    }

    res.json({message: "Register the user"})
})


// @desc Register the user
// @route POST /api/users/register
// @access public
const loginUser = asyncHandler(async(req,res)=> {

    const {email, password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("All Fields are required")
    }

    const user = await UserModel.findOne({ email })

    if(email && await bcrypt.compare(password, user.password)){

        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN,
            {expiresIn: "15m"}
        )

        res.status(200).json({accessToken})
    } else{
        res.status(401)
        throw new Error("email or password is not valid")
    }

})


// @desc Register the user
// @route POST /api/users/register
// @access public
const currentUser = asyncHandler(async(req,res)=> {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}