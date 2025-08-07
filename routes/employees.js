const router = require('express').Router()
const employeesCtrl = require('../controllers/employees')
const multer = require('multer')
// profilePicture

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })


// Routes
router.get('/', employeesCtrl.employees_index_get)
router.get('/new', employeesCtrl.employees_new_get)
router.post(
  '/',
  upload.single('profilePicture'),
  employeesCtrl.employees_create_post
)
router.get('/:employeeId', employeesCtrl.employees_show_get)
router.delete('/:employeeId', employeesCtrl.employees_delete_delete)
router.get('/:employeeId/edit', employeesCtrl.employees_edit_get)
router.put(
  '/:employeeId',
  upload.single('profilePicture'),
  employeesCtrl.employees_update_put
)

module.exports = router
