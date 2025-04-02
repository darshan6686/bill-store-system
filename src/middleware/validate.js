const Joi = require("joi")
const ApiError = require("../utils/ApiError")
const httpStatus = require('http-status')

const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        // const { error } = Joi.validate(schema)
        if (error) {
            const err = new ApiError(httpStatus.status.BAD_REQUEST, error.details[0].message)
            return next(err)
        }
        next()
    }

    // const { error } = Joi.validate(schema)
    // if (error) {
    //     return next(new ApiError(httpStatus.BAD_REQUEST, error.details[0].message))
    // }
    // next()
}

module.exports = validation