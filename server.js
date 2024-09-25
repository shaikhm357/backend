const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mosque = require('./routes/mosqueRoutes.js')
const errorHandler = require('./middleware/error.js')
const connectDB = require('./config/db.js')

// setup env
dotenv.config({ path: './config/config.env' })

// connect to database
connectDB()

// setup express
const app = express()

//body parser
app.use(express.json())

// dev logging middleware
if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/mosque', mosque)

// errorHandler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    // close server and exit process 
    server.close(() => process.exit(1))
})