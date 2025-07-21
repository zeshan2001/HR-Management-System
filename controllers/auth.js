const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.auth_signup_get = async (req, res) => {
  res.render('auth/sign-up.ejs')
}

exports.auth_signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ email: req.body.email })
  if (userInDatabase) {
    return res.send('email already taken.')
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must match')
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  req.session.user = {
    email: user.email,
    _id: user._id,
    role: user.role
  }

  req.session.save(() => {
    // res.redirect('/')
    if(user.role === "hr"){
      res.redirect('/roles/HR_index')
    }else if(user.role === "employee"){
      res.redirect('/roles/Employee_index')
    } else {
      res.send('How did we get here')
    }
  })
}

exports.auth_signin_get = async (req, res) => {
  res.render('auth/sign-in.ejs')
}

exports.auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ email: req.body.email })
  if (!userInDatabase) {
    return res.send('Login failed. Please try again.')
  }
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.send(`Login failed. Please try again.`)
  }

    req.session.user = {
    email: userInDatabase.email,
    _id: userInDatabase._id,
    role: userInDatabase.role
  }

  req.session.save(() => {
    // res.redirect('/')
    if(req.session.user.role === "hr"){
      res.redirect('/roles/HR_index')
    }else if(req.session.user.role === "employee"){
      res.redirect('/roles/Employee_index')
    } else {
      res.send('Your roll is empty')
    }
  })

  // req.session.user = {
  //   email: userInDatabase.email,
  //   _id: userInDatabase._id
  // }
  // req.session.save(() => {
  //   res.redirect('/')
  // })
}

exports.auth_signout_get = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/sign-in')
  })
}