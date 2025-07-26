const router = require('express').Router()
const projecstCtrl = require('../controllers/projects')

// Routes
// index.ejs
router.get('/', projecstCtrl.projects_index_get)
// 
// new.ejs
router.get('/new', projecstCtrl.projects_new_get)
router.post('/', projecstCtrl.projects_create_post)
// 
// show.ejs
router.get('/:projectId', projecstCtrl.projects_show_get)
router.delete('/:projectId', projecstCtrl.projects_delete_delete)
// 
// edit.ejs
router.get('/:projectId/edit',projecstCtrl.projects_edit_get)
router.put('/:projectId', projecstCtrl.projects_update_put)

module.exports = router



