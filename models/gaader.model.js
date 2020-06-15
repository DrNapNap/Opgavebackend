const mongoose = require('mongoose')

const gaaderSchema = new mongoose.Schema({
    gaade: {
    type: String,
    required: true
  },
  svar: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Gaader', gaaderSchema)