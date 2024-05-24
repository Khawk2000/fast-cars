const User = require('../models/User')
const Car = require('../models/Car')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

//@desc Create new user
//@route POST /users
//@access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, firstName, lastName } = req.body

    //Confirm data
    if(!username || !password || !firstName || !lastName ){
        return res.status(400).json({ message: 'All fields are required' })
    }

    //Check for dupes
    const dup = await User.findOne({ username }).lean().exec()

    if(dup){
        return res.status(409).json({ message: 'Duplicate username'})
    }

    //Hash password 
    const hashPwd = await bcrypt.hash(password, 10) //salt rounds

    const userObject = { username, "password": hashPwd, firstName, lastName }

    //Create and store new user
    const user = await User.create(userObject)

    if(user) //created
    {
        res.status(201).json({ message: `New user: ${username} created`})
    }else{
        res.status(400).json({ message: 'Invalid user data received'})
    }

})

//@desc Update a user
//@route PATCH /users
//@access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, firstName, lastName } = req.body

    //Confirm data
    if(!id || !username || !firstName || !lastName){
        return res.status(400).json({ message: 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: "User not found"})
    }

    //check for dupes
    const dup = await User.findOne({ username }).lean().exec()
    //Allow updates to original user
    if(dup && dup?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate username'})
    }

    user.username = username
    user.firstName = firstName
    user.lastName = lastName

    if(password){
        //Hash pwd
        user.password = await bcrypt.hash(password, 10) //salt rounds
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated`})
})

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if(!id){
        return res.status(400).json({message: 'User ID Required'})
    }

    const car = await Car.findOne({ user: id }).lean().exec()
    if(car){
        return res.status(400).json({message: 'User has assigned Car'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}