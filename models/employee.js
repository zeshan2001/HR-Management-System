const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true},
    name: { type: String, required: true },
    profilePicture: {type: String, required: true},
    phone: {type: String, required: true},
    salary: {type: Number, required: true}
  },
  { timestamps: true }
)
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee