
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const mongoose = require('mongoose');

require('dotenv').config()
const myPassword = process.env.PASSWORD
const myNAME = process.env.NAME
const myCOLLECTION =process.env.COLLECTION
const myPORT =process.env.PORT


mongoose.connect('mongodb+srv://'+myNAME+':'+myPassword+'@cluster0.p8aesom.mongodb.net/'+myCOLLECTION,{useNewUrlParser: true})



// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });

//   kitty.save().then(() => console.log('meow'));

  const blogSchema = {
    title:String,
    body:String
  }
const posts = mongoose.model('post',blogSchema)

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hare you can make lists or take short notes";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/post/:tit",function(req,res){

//   console.log(fruits_details.filter(
//     (element) => element.fruit_color === "Red")
// );
const postTitle = req.params.tit

posts.findOne({title:postTitle},(err,post)=>{

 if (!err) {
   res.render("post",{postssT:post.title,postssC:post.body})
  
 }
} )
 


 })


app.get("/",function(req,res){
  
  posts.find({},(err,collaction)=>{
    if (!err) {
      res.render("home",{posts:collaction})
    }})
   

 
})
app.get("/List",function(req,res){

  res.render("List",{ListInfo:aboutContent})

})

app.post("/List",function(req,res){

  const listName =  req.body.ListName
  
  res.redirect("https://muddy-loincloth-fish.cyclic.app/"+listName)


})

app.get("/contact",function(req,res){
  res.render("contact",{contactInfo:contactContent})
})
app.get("/compose",function(req,res){
  res.render("compose")
})
app.post("/compose",function(req,res){
  let compose = new posts({
    title: req.body.postTitle,
    body : req.body.postBody
  } )
  compose.save().then(() => console.log('meow'));
  res.redirect('/')
}

)
app.post("/delete",(req,res)=>{
  const deleto = req.body.deleteMe
  
  posts.deleteOne({ title: deleto }, function (err) {
    if (err) return handleError(err);
   
  });
 
 res.redirect("/")
})









app.listen(myPORT, function() {
  console.log("Server started on port "+myPORT);
});
// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
  
// }