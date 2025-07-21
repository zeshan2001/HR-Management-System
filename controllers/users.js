const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.users_index_get = async (req, res) => {
  try {
    const users = await User.find()
    res.render('users/index.ejs', {users})
  } catch (error) {
    console.log(error)
  }
}

exports.users_show_get = async (req, res) => {
  try {
    const userInfo = await User.findById(req.params.userId)
    res.render('users/show.ejs', { userInfo })
  } catch (error) {
    console.log(error)
  }
}

// exports.users_profile_get = async (req, res) => {
//   try {
//     const userInfo = await User.findById(req.session.user._id)
//     // console.log(userInfo)
//     res.render('users/profile.ejs', { userInfo })
//   } catch (error) {
//     console.log(error)
//   }
// }

exports.users_new_get = async (req, res) => {
  try {
    res.render('users/new.ejs')
  } catch (error) {
    console.log(error)
  }
}

exports.users_create_post = async (req, res) => {
  try {
    // req.body.salary = parseInt(req.body.salary)
    const userInDatabase = await User.findOne({ email: req.body.email })
    if (userInDatabase) {
      return res.send('email already taken.')
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match')
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    console.log(req.body)
    const user = await User.create(req.body)
    res.redirect('/users/index')

    // req.session.user = {
    //   email: user.email,
    //   _id: user._id,
    //   role: user.role
    // }

    // req.session.save(() => {
    //   // res.redirect('/')
    //   if(user.role === "hr"){
    //     // res.redirect('/roles/HR_index')
    //     res.redirect('/')
    //   }else if(user.role === "employee"){
    //     // res.redirect('roles/Employee_index')
    //     res.redirect('/')
    //   } else {
    //     res.send('How did we get here')
    //   }
    // })
  } catch (error) {
    console.log(error)
  }

}

exports.users_edit_get = async (req, res) => {
  const userInfo = await User.findById(req.params.userId)
  // res.render(`users/${req.params.userId}/edit.ejs`, {userInfo})
  res.render(`users/edit.ejs`, {userInfo})
}

exports.users_update_put = async (req, res) => {
  console.log(req.body)
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new:true
  })
  console.log(`id: ${user._id}`)
  res.redirect(`/users/${user._id}`)
}

exports.users_delete_delete = async (req,res) => {
  await User.findByIdAndDelete(req.params.userId)
  res.redirect("/users")
}