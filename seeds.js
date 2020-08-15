var mongoose =  require("mongoose");

var bookmark = require("./bookmark");
var tag = require("./tag")

data = [ 
    { 
    title:"forest",
    link: "https://www.w3schools.com/css/img_forest.jpg",
    
},
{   title : "desert",
    link : "https://www.w3schools.com/css/img_lights.jpg",
   
},
{   title : "river",
    link : "https://www.w3schools.com/css/img_mountains.jpg"
    
}
    
]


function seeddb(){
    
    bookmark.remove({},function(err){
        if(err){
            connsole.log(err);
        }
        console.log("removed")
        data.forEach(function(seed){
            bookmark.create(seed,function(err, bookmark){
                if(err){
                    console.log(err)
                }else{
                    console.log("aded bookmark")
                    tag.create({
                        name: "skd"
                    },
                    function(err, tag){
                        if(err){
                            console.log(err)
                        }else{
                            bookmark.tag.push(tag);
                            bookmark.save();
                            console.log("create a new comment")
                        }
                    }
                    )
                }
            })
        })
    })
}

    

module.exports = seeddb