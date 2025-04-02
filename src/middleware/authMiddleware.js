const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asynHandler");
const httpStatus = require('http-status')
const Jwt = require('jsonwebtoken')
const userService = require('../services/user.service')

const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(httpStatus.status.BAD_REQUEST, 'Invalid token')
        }

        const decodedToken = Jwt.verify(token, config.config.TOKEN_SECRET)

        const user = await userService.getUser({_id: decodedToken?._id}, {password: -1})

        if (!user) {
            throw new ApiError(httpStatus.status.NOT_FOUND, 'Invalid token')
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(httpStatus.status.BAD_REQUEST, "Bearer token is reuired")
    }
})

module.exports = authMiddleware