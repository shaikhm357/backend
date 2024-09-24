const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const test = require('./routes/testRoutes.js')

// setup env
dotenv.config({ path: './config/config.env' })

// setup express
const app = express()

// dev logging middleware
if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/test', test)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))