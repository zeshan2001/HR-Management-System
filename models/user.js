const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {enum:['hr','employee']},
    profilePicture: {type: String, required: true},
    phone: {type: String, required: true},
    salary: {type: Number, required: true}
  },
  { timestamps: true }
)
const User = mongoose.model('User', userSchema)

module.exports = User