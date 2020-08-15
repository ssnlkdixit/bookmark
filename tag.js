var mongoose = require("mongoose")


var tagSchema = new mongoose.Schema({
    name: String,
    
    created: {type: Date, default: Date.now}

 })
module.exports = mongoose.model("tag",tagSchema);