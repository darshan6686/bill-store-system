module.exports = {
    config: {
        CORS: process.env.CORS,
        PORT: process.env.PORT,
        MONGODB_URL: process.env.MONGODB_URL,
        TOKEN_SECRET: process.env.TOKEN_SECRET,
        TOKEN_EXPIRES: process.env.TOKEN_EXPIRES,
    }
}