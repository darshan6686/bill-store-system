const dotenv = require('dotenv').config()
const connectDb = require('./db/index')
const { app } = require('./app')
const config = require('./config/config')

const port = config.config.PORT || 3232

connectDb()
    .then(() => {
        app.on('error', (error) => {
            console.error('Error: ', error)
            throw error
        })
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((error) => {
        console.error('Error: ', error)
    })