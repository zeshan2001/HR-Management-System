const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true},
    name: { type: String, required: true },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    phone: {type: String, required: true},
    salary: {type: Number, required: true, min: 0},
    department: {
      type: String, 
      enum: ['Sales', 'Marketing', 'IT'],
      required: true
    },
        hr: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
  },
  { timestamps: true }
)
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee