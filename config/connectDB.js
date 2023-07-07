const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const DB = process.env.DB_CONNECTION_STRING.replace(
    '<password>',
    process.env.DB_PASSWORD
)

const connectDB = async () => 