const Project = require('../models/project')

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
    const projectInfo = await Project.findById(req.params.projectId)
    res.render('projects/show.ejs', { projectInfo })
  } catch (error) {
    console.log(error)
  }
}

exports.projects_new_get = async (req, res) => {
  try {
    res.render('projects/new.ejs')
  } catch (error) {
    console.log(error)
  }
}

exports.projects_create_post = async (req, res) => {
  try {
    await Project.create(req.body)
    res.redirect('/projects/index')

  } catch (error) {
    console.log(error)
  }
}

exports.projects_edit_get = async (req, res) => {
  const projectInfo = await Project.findById(req.params.projectId)
  res.render(`projects/edit.ejs`, {projectInfo})
}

exports.projects_update_put = async (req, res) => {
  console.log(req.body)
  const project = await Project.findByIdAndUpdate(req.params.projectId, req.body, {
    new:true
  })
  console.log(`id: ${project._id}`)
  res.redirect(`/projects/${project._id}`)
}

exports.projects_delete_delete = async (req,res) => {
  await Project.findByIdAndDelete(req.params.projectId)
  res.redirect("/projects")
}