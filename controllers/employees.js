const bcrypt = require('bcrypt')
const Employee = require('../models/employee')

exports.employees_index_get = async (req, res) => {
  try {
    const findEmployees = await Employee.find()
    const employees = findEmployees.filter((employee) => {
      return employee.hr._id.equals(req.session.user._id)
    })
    res.render('employees/index.ejs', { employees })
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
    req.body.profilePicture = req.file.filename
    req.body.hr = req.session.user._id
    const employee = await Employee.create(req.body)
    res.redirect('/employees')
  } catch (error) {
    console.log(error)
  }
}

exports.employees_edit_get = async (req, res) => {
  const employee = await Employee.findById(req.params.employeeId)
  res.render(`employees/edit.ejs`, { employee })
}

exports.employees_update_put = async (req, res) => {
  try {
    const currentEmployee = await Employee.findById(req.params.employeeId)
    if (currentEmployee.hr.equals(req.session.user._id)) {
      await currentEmployee.updateOne(req.body)
      res.redirect(`/employees/${currentEmployee._id}`)
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

exports.employees_delete_delete = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId)

    if (employee.hr.equals(req.session.user._id)) {
      await employee.deleteOne()
      res.redirect('/employees')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}
