const config = require('../config/config')
const DB_NAME = require('../constant')
const mongoose = require('mongoose')

const connectDb = async() => {
    try {
        const connect = await mongoose.connect(`${config.config.MONGODB_URL}/${DB_NAME}`)
        console.log(`\nMongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.log('\nfailed to connection db', error);
        process.exit(1)
    }
}

module.exports = connectDb;