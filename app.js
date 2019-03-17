var express         = require('express'),
    methodOverride  = require('method-override'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose');

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/simple_express_blog", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
mongoose.set("useFindAndModify", false);

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", function(req, res) {
    res.redirect("/SimpleExpressBlog/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", { blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
   // create blog
   Blog.create(req.body.blog, function(err, newBlog) {
       if(err) {
           res.render("new");
       } else {
           // then, redirect to the index
           res.redirect("/SimpleExpressBlog/blogs");
       }
   });
   
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/SimpleExpressBlog/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/SimpleExpressBlog/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/SimpleExpressBlog/blogs");
        } else {
            res.redirect("/SimpleExpressBlog/blogs/req.params.id");
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/SimpleExpressBlog/blogs");
        } else {
            res.redirect("/SimpleExpressBlog/blogs");
        }
    });
});

// RUN CONFIG
app.listen(3084, function() {
    console.log("The Simple Express Blog Server Has Started!");
})