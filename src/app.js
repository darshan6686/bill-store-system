const config = require('./config/config')
const exppress = require('express')
const app = exppress()
const cors = require('cors')
const router = require('./routes')

app.use(cors({
    origin: config.config.CORS,
    credentials: true
}))
app.use(exppress.json())
app.use(exppress.urlencoded({ extended: true }))
app.use(exppress.static('public'))

// v1 routes
app.use("/v1", router)

module.exports = {
    app
}