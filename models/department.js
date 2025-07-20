const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
  {
    departmentName: { type: String, required: true},
    numbeOfEmployees: { type: Number, required: true },
    employeesInDepartment:{
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                     ref: 'User'
                    }
            ],
        },
    projectsInDepartment:{
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                     ref: 'Project'
                    }
            ],
        },
  },
  { timestamps: true }
)
const Department = mongoose.model('Department', departmentSchema)

module.exports = Department