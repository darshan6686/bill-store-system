const config = require('./config/config')
const exppress = require('express')
const app = exppress()
const cors = require('cors')

app.use(cors({
    origin: config.CORS,
    credentials: true
}))
app.use(exppress.json())
app.use(exppress.urlencoded({ extended: true }))
app.use(exppress.static('public'))

module.exports = {
    app
}