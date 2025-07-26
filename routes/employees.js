const router = require('express').Router()
const employeesCtrl = require('../controllers/employees')

// Routes
// index.ejs
router.get('/', employeesCtrl.employees_index_get)
// 
// new.ejs
router.get('/new', employeesCtrl.employees_new_get)
router.post('/', employeesCtrl.employees_create_post)
// 
// show.ejs
router.get('/:employeeId', employeesCtrl.employees_show_get)
router.delete('/:employeeId', employeesCtrl.employees_delete_delete)
// 
// edit.ejs
router.get('/:employeeId/edit', employeesCtrl.employees_edit_get)
router.put('/:employeeId', employeesCtrl.employees_update_put)

module.exports = router
