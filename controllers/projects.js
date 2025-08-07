const Project = require('../models/project')
const Employee = require('../models/employee')

exports.projects_index_get = async (req, res) => {
  try {
    const findProjects = await Project.find()
    const projects = findProjects.filter((e) => {
      return e.hr._id.equals(req.session.user._id)
    })
    res.render('projects/index.ejs', { projects })
  } catch (error) {
    console.log(error)
  }
}

exports.projects_show_get = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)

    if (project.hr.equals(req.session.user._id)) {
      const employeesName = await Employee.find()
      let employeesInProject = []
      for (let i = 0; i < project.employees.length; i++) {
        for (let j = 0; j < employeesName.length; j++) {
          project.employees[i]._id.equals(employeesName[j]._id)
            ? employeesInProject.push(employeesName[j])
            : null
        }
      }
      res.render('projects/show.ejs', { project, employeesInProject })
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
  }
}

exports.projects_new_get = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.render('projects/new.ejs', { employees })
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

  if (project.hr.equals(req.session.user._id)) {
    const employees = await Employee.find()
    project.startDateFormatted = project.startDate.toISOString().split('T')[0]
    project.deadLineFormatted = project.deadLine.toISOString().split('T')[0]
    res.render(`projects/edit.ejs`, { project, employees })
  } else {
    res.send("You don't have permission to do that.")
  }
}

exports.projects_update_put = async (req, res) => {
  try {
    const currentProject = await Project.findById(req.params.projectId)
    if (currentProject.hr.equals(req.session.user._id)) {
      await currentProject.updateOne(req.body)
      res.redirect(`/projects/${currentProject._id}`)
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

exports.projects_delete_delete = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
    if (project.hr.equals(req.session.user._id)) {
      await project.deleteOne()
      res.redirect('/projects')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}
