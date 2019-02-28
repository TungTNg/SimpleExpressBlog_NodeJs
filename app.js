var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/simple_express_blog", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", { blogs: blogs});
        }
    });
});


// RUN CONFIG
app.listen(3084, function() {
    console.log("The Simple Express Blog Server Has Started!");
})