var mongoose = require("mongoose")
var bookmarkSchema = new mongoose.Schema({
    title: String,
    link: String,
    body: String,
    created: {type: Date, default: Date.now},
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag"

    }
        
        
    ]
})
    module.exports = mongoose.model("bookmark", bookmarkSchema)