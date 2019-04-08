// External Dependancies
const mongoose = require('mongoose')

const meterSchema = new mongoose.Schema({
    date: Date,
    amount: Number
})

module.exports = mongoose.model('Records', meterSchema)