const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'))

// Importing all the routes
const homeroute=require("./routes/home.js")
const loginroute=require("./routes/login.js")
const catalogueroute=require("./routes/catalogue.js")

app.get('/', function(req, res) {
  res.redirect('/Home');
});

app.get('/index.html', function(req, res) {
  res.redirect('/Home');
});

app.get('/catalogue.html', function(req, res) {
  res.redirect('/Catalogue');
});

app.get('/login.html', function(req, res) {
  res.redirect('/Login');
});
  
// Handling routes request
app.use("/",homeroute)
app.use("/",loginroute)
app.use("/",catalogueroute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


//The changes I made broke the styling on the normal page if you click "Go Live" --> Need to find a fix for this
//Last thing to do is to find out how to load in the product data as well --> Nothing loads currently when you got to the paths