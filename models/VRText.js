const
    mongoose = require('mongoose'),

vrTextSchema = new mongoose.Schema({
    text: String,
    xCoordinate: Number,
    xCoordinate: Number,
    xCoordinate: Number
})

const VRText = mongoose.model('VRText', vrTextSchema)
module.exports = VRText