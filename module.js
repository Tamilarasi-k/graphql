var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema = new Schema({
    RollNo:String,
    Name:String,
    Tamil:String,
    English:String,
    Maths:String,
    Science:String,
    Social:String
    
})

module.exports = mongoose.model('Student',studentSchema)