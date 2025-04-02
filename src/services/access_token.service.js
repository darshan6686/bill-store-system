const Access_token = require('../models/access_token.model')

// create update token
const createAccessToken = async (filter, body) => {
    return await Access_token.findOneAndUpdate(filter, body, {upsert: true, new: true})
}

module.exports = {
    createAccessToken
}