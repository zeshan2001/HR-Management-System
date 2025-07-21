const router = require('express').Router()
const usersCtrl = require('../controllers/users')

// Routes
router.get('/', usersCtrl.users_index_get)

router.get('/new', usersCtrl.users_new_get)
router.post('/new', usersCtrl.users_create_post)

router.get('/:userId', usersCtrl.users_show_get)
// router.get('/:userId', usersCtrl.users_profile_get)

router.get('/:userId/edit', usersCtrl.users_edit_get)
router.put('/:userId/edit', usersCtrl.users_update_put)

router.delete('/:userId', usersCtrl.users_delete_delete)

module.exports = router