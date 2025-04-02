const express = require('express')
const router = express.Router()
const {regsiterAndLogin, forgetPasswordValidation, changePasswordValidation} = require('../validation/user.validation')
const { regsiter, login, changePassword, forgetPassword } = require('../controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')
const validation = require('../middleware/validate')

// register user
router.post(
    '/register',
    validation(regsiterAndLogin),
    regsiter
)

// login user
router.post(
    '/login',
    validation(regsiterAndLogin),
    login
)

// change password
router.put(
    "/change-password",
    authMiddleware,
    validation(changePasswordValidation),
    changePassword
)

// forget password
router.post(
    "/forget-password",
    validation(forgetPasswordValidation),
    forgetPassword
)
module.exports = router