const User = require("../models/user.model")

// get user by filter
const getUser = async (filter, projection = {}, options = {}) => {
    return User.findOne({...filter, deletedAt: null}, projection, options)
}

// create user
const createUser = async (body) => {
    return await User.create(body)
}

// update user
const updateUser = async (filter, body) => {
    return await User.findOneAndUpdate(
        {...filter, deletedAt: null},
        body,
        {new: true}
    )
}

module.exports = {
    getUser,
    createUser,
    updateUser
}