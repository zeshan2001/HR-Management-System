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


const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ dest: 'uploads/' })

app.post('/stats', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body)
});

// Middlewares
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
