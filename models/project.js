const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    startDate: { type: Date, required: true },
    deadLine: { type: Date, required: true },
    budget: { type: Number, required: true },
    description: { type: String, required: true },
    employees: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Employee'
        }
      ]
    },
    hr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)
const Project = mongoose.model('Project', projectSchema)

module.exports = Project
