const { default: mongoose } = require('mongoose')

const visitorSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  venue: String,
  days_of_stay: Number,
  idType: String,
  idNumber: String,
  days: Number,
})

module.exports = mongoose.model('Visitor', visitorSchema)
