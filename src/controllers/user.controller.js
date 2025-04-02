const asyncHandler = require("../utils/asynHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const userService = require('../services/user.service')
const accessTokenservice = require('../services/access_token.service')
const httpStatus = require('http-status')

// register user
const regsiter = asyncHandler(async (req, res) => {
    const { email } = req.body

    const existEmail = await userService.getUser({ email })

    if (existEmail) {
        throw new ApiError(httpStatus.status.BAD_REQUEST, "Email already register")
    }

    const createdUser = await userService.createUser({
        email,
        password: req.body.password,
    })

    if (!createdUser) {
        throw new ApiError(httpStatus.status.BAD_REQUEST, 'somethig went to wrong register user')
    }

    const newUser = await userService.getUser({_id: createdUser._id}, {password: 0})

    return res
    .status(httpStatus.status.CREATED)
    .json(
        new ApiResponse(
            httpStatus.status.CREATED,
            {user: newUser},
            "User register successfully"
        )
    )
})

// login user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await userService.getUser({ email }, {password: 1, email: 1})

    if(!user){
        throw new ApiError(httpStatus.status.NOT_FOUND, 'Email not rgistered')
    }

    const validPassword = await user.isPasswordCorrect(password)

    if(!validPassword){
        throw new ApiError(httpStatus.status.BAD_REQUEST, 'Wrong password')
    }

    const token = user.generateToken()

    await accessTokenservice.createAccessToken(
        {
            user: user?._id,
        },
        {
            user: user?._id,
            token: token
        }
    )

    return res
    .status(httpStatus.status.OK)
    .json(
        new ApiResponse(
            httpStatus.status.OK,
            {
                user,
                token
            },
            "Login successfully"
        )
    )
})

// change password
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await userService.getUser({_id: req.user._id})

    if (!user) {
        throw new ApiError(httpStatus.status.NOT_FOUND, 'user not found')
    }

    const validPassword = await user.isPasswordCorrect(oldPassword)

    if (!validPassword) {
        throw new ApiError(httpStatus.status.NOT_FOUND, 'Wrong password')
    }

    // update password
    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    
    return res
    .status(httpStatus.status.OK)
    .json(
        new ApiResponse(
            httpStatus.status.OK,
            user,
            "Password changed successsfully"
        )
    )
})

// forget password
const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await userService.getUser({email: email})

    if (!user) {
        throw new ApiError(httpStatus.status.NOT_FOUND, 'Email not registered')
    }

    return res
    .status(httpStatus.status.OK)
    .json(
        new ApiResponse(
            httpStatus.status.OK,
            email,
            'Email sent to successfully'
        )
    )
})

module.exports = {
    regsiter,
    login,
    changePassword,
    forgetPassword
}