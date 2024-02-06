 //jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extende:true
}))

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// const sec = process.env.SE

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password']})

const User = new mongoose.model("User", userSchema)


app.post("/register", (req, res)=>{
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save((err)=>{
    if (err){
    console.log(err);
    }
    else{
      res.render("secrets")
    }
  })
})

app.post("/login", (req, res)=>{
  let userName = req.body.username
  let userPassword = req.body.password

  User.findOne({emai: userName},(err, foundUser)=>{
    if (err){
      console.log(err);
    }else{
      if (foundUser.password === userPassword){
      res.render("secrets")
      }
    }
  })
})



app.get("/", (req, res)=>{
  res.render("home")
})

app.get("/login", (req, res)=>{
  res.render("login")
})

app.get("/register", (req, res)=>{
  res.render("register")
})















module.exports = app;
// app.listen(3000, function () {
//   console.log("Server started on port 3000");
// });
