var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var vendorSchema = new Schema({
    code:{type:String,require:true},
    name:{type:String,require:true},
    mobile:String,
    address:{
        line:String,
        Street:String,
        city:String,
        state:String,
        country:String,
        pincode:String,
        phone:String,
        email:String
    },
    GSTNO:String,
    DLNO:String,
    active:Boolean,
    createdby:String,
    createddate:String,
    modifiedby:String,
    modifieddate:String
})
module.exports = mongoose.model('Vendor',vendorSchema);