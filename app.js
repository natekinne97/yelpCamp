var express = require("express"),
     app = express(),
     bodyParser = require("body-parser"),
     mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});


var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {name: "Granite Hill", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5tUSaSd5IEwNd5xnXQhrb6XkIhCZJJBuO5pgF0UHFbROvAN6W"}
    , function(err, campground){
        if(err){
            console.log(err);
        }else{
            console.log("Newly created campground" + campground);
        }
    });

*/
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
   /// get all campgrounds from db
   
   Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       }else{
           console.log("Displaying campgrounds");
           res.render("campgrounds", {campgrounds: allCampgrounds});
       }
   });
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
    
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    console.log("Above var newCampground");
    var newCampground = {name: name, image: image};
    
    console.log("Running create");
    //create new campground and save to database
   Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});