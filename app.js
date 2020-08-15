// const campground = require("../yelpcamp/campground");
// const seedDB = require("../yelpcamp/seeds");

//const tag = require("./tag");

var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
express = require("express"),
mongoose = require("mongoose"),
app = express();
bookmark = require("./bookmark")
var tag = require("./tag")
seedDB = require("./seeds")

seedDB();

mongoose.connect("mongodb://localhost:27017/bookmark_app",{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("database conected")
})

app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"))
//  var bookmarkSchema = new mongoose.Schema({
//     title: String,
//     link: String,
//     body: String,
//     created: {type: Date, default: Date.now},
    
        
        
    

//  })
//  var bookmark = mongoose.model("bookmark",bookmarkSchema)
//  var tagSchema = new mongoose.Schema({
//     name: String,
    
//     created: {type: Date, default: Date.now}

//  })


// var tag = mongoose.model("tag",tagSchema)

app.get("/",function(req, res){
    res.redirect("/bookmark")
})

app.get("/bookmark", function(req, res){
    bookmark.find({},function(err,bookmark){
        if(err){
            console.log(err)
        }else{
            res.render("index", {bookmark: bookmark});

        }
    })
    
})
app.get("/bookmark/new",function(req,res){
    res.render("new")
})

app.post("/bookmark",function(req,res){
    bookmark.create(req.body.bookmark, function(err,newBookmarks){
        if(err){
            res.render("new")
        }else{
            res.redirect("/bookmark")
        }
    })
})
app.get("/bookmark/:id", function(req,res){
   bookmark.findById(req.params.id).populate("tag").exec( function(err, bookmark){
       if(err){
           res.redirect("/bookmark")
       }else{
           res.render("show",{bookmark: bookmark})
       }
   })
})

app.get("/bookmark/:id/edit",function(req,res){
    bookmark.findById(req.params.id,function(err,foundBookmark){
        if(err){
            res.redirect("/bookmark")
        }else{
            res.render("edit",{bookmark: foundBookmark})
        }
    })
})
app.put("/bookmark/:id",function(req,res){
    bookmark.findByIdAndUpdate(req.params.id, req.body.bookmark,function(err,updatebookmark){
        if(err){
            res.redirect("/bookmark")
        }else{
            res.redirect("/bookmark/" + req.params.id)
        }
    })
})
app.delete("/bookmark/:id",function(req,res){
    bookmark.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/bookmark")
        }else{
            res.redirect("/bookmark")
        }
    })
})
app.get("/bookmark/:id/tag/new",function(req,res){
    tag.findById(req.params.id, function(err,bookmark){
        if(err){
            console.log(err)
        }else{
            res.render("newtag", {bookmark: bookmark})
        }
    })
})
 app.post("/bookmark/:id/tag", function(req,res){
     bookmark.findById(req.params.id, function(err, bookmark){
         if(err){
             res.redirect("/bookmark")
         }else{
             tag.create(req.body.tag, function(err, tag){
                 if(err){
                     console.log(err)
                 }else{
                    bookmark.tag.push(tag);
                    bookamrk.save()
                    res.redirect("/bookmark/" + bookmark._id)
                     
                 }
             })
             
         }
     })
 })
 app.get("/bookmark/tag",function(req,res){
    res.render("newtags")
})
    

app.post("/bookmark",function(req,res){
    tag.create(req.body.tag, function(err,newTag){
        if(err){
            res.render("newtags")
        }else{
            res.redirect("/bookmark")
        }
    })
})

app.listen(3000, ()=> console.log("bookmark servaer has strted"))