require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const logger = require('morgan')
const session = require('express-session')
const authRoutes = require('./routes/auth')
const employeesRoutes = require('./routes/employees')
const projectsRoutes = require('./routes/projects')
const passUserToView = require('./middlewares/pass-user-to-view')
const isSignedIn = require('./middlewares/is-signed-in')
const MongoStore = require('connect-mongo')
const app = express()

const PORT = process.env.PORT ? process.env.PORT : 3000
const database = require('./config/db')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
)

app.use(passUserToView)

app.get('/', (req, res) => {
  if (req.session.user) {
    res.render('hr.ejs')
  } else {
    res.render('index.ejs')
  }
})

// Auth Routes
app.use('/auth', authRoutes)

app.use('/employees', isSignedIn, employeesRoutes)
app.use('/projects', isSignedIn, projectsRoutes)

app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})
