const Project = require('../models/project')
const Employee = require('../models/employee')

exports.projects_index_get = async (req, res) => {
  try {
    const projects = await Project.find()
    res.render('projects/index.ejs', {projects})
  } catch (error) {
    console.log(error)
  }
}

exports.projects_show_get = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
    const employeesN = await Employee.find()
    let ee = []

    console.log(project.employees)
    for (let i = 0; i < project.employees.length; i++) {

      for (let j = 0; j < employeesN.length; j++) {
        console.log(project.employees[i]._id.equals(employeesN[j]._id))

        project.employees[i]._id.equals(employeesN[j]._id)? ee.push(employeesN[j]) : null
        
        
      }
      
    }
    console.log(ee)

    res.render('projects/show.ejs', { project, ee })
  } catch (error) {
    console.log(error)
  }
}

exports.projects_new_get = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.render('projects/new.ejs', {employees})
  } catch (error) {
    console.log(error)
  }
}

exports.projects_create_post = async (req, res) => {
  try {
    req.body.hr = req.session.user._id
    const project = await Project.create(req.body)
    res.redirect('/projects')

  } catch (error) {
    console.log(error)
  }
}

exports.projects_edit_get = async (req, res) => {
  const project = await Project.findById(req.params.projectId)
  // branch aliii - added const employee
  const employees = await Employee.find()
  // branch aliii - added const employee
  project.startDateFormatted = project.startDate.toISOString().split('T')[0]
  project.deadLineFormatted = project.deadLine.toISOString().split('T')[0]
  res.render(`projects/edit.ejs`, {project, employees})
}

exports.projects_update_put = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.projectId, req.body, {
    new:true
  })
  res.redirect(`/projects/${project._id}`)
}

exports.projects_delete_delete = async (req,res) => {
  await Project.findByIdAndDelete(req.params.projectId)
  res.redirect("/projects")
}