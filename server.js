require('dotenv').config()
// App requires
const express = require('express')
const app = express()
//
// DB requires
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
//
// Middleware requires
const methodOverride = require('method-override')
const logger = require('morgan')
const session = require('express-session')
const passUserToView = require('./middlewares/pass-user-to-view')
const isSignedIn = require('./middlewares/is-signed-in')
//
// Routes requires
const authRoutes = require('./routes/auth')
const employeesRoutes = require('./routes/employees')
const projectsRoutes = require('./routes/projects')
//
// Model requires
const Project = require('./models/project')
const Employee = require('./models/employee')
//
// app.use(express.static('public'))
// DB Configs
const PORT = process.env.PORT ? process.env.PORT : 3000
const database = require('./config/db')
//
// Middleware Configs
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
app.get('/', async (req, res) => {
  if (req.session.user) {
    const employees = await Employee.find()
    const projects = await Project.find()
    console.log(employees.length)
    console.log(projects.length)
    res.render('hr.ejs', {
      countEmp: employees.length,
      countPro: projects.length
    })
  } else {
    res.render('index.ejs')
  }
})
//
// Route Configs
app.use('/auth', authRoutes)
app.use('/employees', isSignedIn, employeesRoutes)
app.use('/projects', isSignedIn, projectsRoutes)
//
// LIVE Port
app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})
