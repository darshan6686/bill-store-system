const Joi = require('joi')

const regsiterAndLogin = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required()
})

const changePasswordValidation = Joi.object({
    oldPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required()
})

const forgetPasswordValidation = Joi.object({
    email: Joi.string().trim().required()
})

module.exports = {
    regsiterAndLogin,
    changePasswordValidation,
    forgetPasswordValidation
}