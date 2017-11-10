const
    mongoose = require('mongoose'),

vrTextSchema = new mongoose.Schema({
    text: String,
    xCoordinate: Number,
    xCoordinate: Number,
    xCoordinate: Number,
    homeID: String,
    posterID: String
})

const VRText = mongoose.model('VRText', vrTextSchema)
module.exports = VRText