const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()

const PORT = process.env.PORT ? process.env.PORT : 3000

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.get('/', (req, res) => {
  res.send('Your app is connected . . . ')
})

app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})