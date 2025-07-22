const bcrypt = require('bcrypt')
const Employee = require('../models/employee')

exports.employees_index_get = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.render('employees/index.ejs', {employees})
  } catch (error) {
    console.log(error)
  }
}

exports.employees_show_get = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId)
    res.render('employees/show.ejs', { employee })
  } catch (error) {
    console.log(error)
  }
}

exports.employees_new_get = async (req, res) => {
  try {
    res.render('employees/new.ejs')
  } catch (error) {
    console.log(error)
  }
}

exports.employees_create_post = async (req, res) => {
  try {
    req.body.hr = req.session.user._id
    const employee = await Employee.create(req.body)
    res.redirect('/employees')
  } catch (error) {
    console.log(error)
  }
}

exports.employees_edit_get = async (req, res) => {
  const employee = await Employee.findById(req.params.employeeId)
  res.render(`employees/edit.ejs`, {employee})
}

exports.employees_update_put = async (req, res) => {
  console.log(req.body)
  const employee = await Employee.findByIdAndUpdate(req.params.employeeId, req.body, {
    new:true
  })
  console.log(`id: ${employee._id}`)
  res.redirect(`/employees/${employee._id}`)
}

exports.employees_delete_delete = async (req,res) => {
  await Employee.findByIdAndDelete(req.params.employeeId)
  res.redirect("/employees")
}