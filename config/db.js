const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOD_URL) 

mongoose.connection.on("connected", () => {
    console.log(`Connected to the DB ${mongoose.connection.name}`)
})

module.exports = mongoose; 