//schema
var mongoose = require("mongoose");

var links = new mongoose.Schema({
        link:{
            type: String,
            required:true
        },
        usrid:{
            type:Number,
            required:true
        }
    });
module.exports=mongoose.model('links',links);