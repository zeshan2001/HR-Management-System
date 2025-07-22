const router = require('express').Router()
const employeesCtrl = require('../controllers/employees')

// Routes
router.get('/', employeesCtrl.employees_index_get)

router.get('/new', employeesCtrl.employees_new_get)
router.post('/new', employeesCtrl.employees_create_post)

router.get('/:employeeId', employeesCtrl.employees_show_get)

router.get('/:employeeId/edit', employeesCtrl.employees_edit_get)
router.put('/:employeeId/edit', employeesCtrl.employees_update_put)

router.delete('/:employeeId', employeesCtrl.employees_delete_delete)

module.exports = router