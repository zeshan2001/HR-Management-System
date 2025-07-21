const router = require('express').Router()
const projecstCtrl = require('../controllers/projects')

// Routes
router.get('/', projecstCtrl.projects_index_get)

router.get('/new', projecstCtrl.projects_new_get)
router.post('/new', projecstCtrl.projects_create_post)

router.get('/:projectId', projecstCtrl.projects_show_get)

router.get('/:projectId/edit',projecstCtrl.projects_edit_get)
router.put('/:projectId/edit', projecstCtrl.projects_update_put)

router.delete('/:projectId', projecstCtrl.projects_delete_delete)

module.exports = router