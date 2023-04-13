const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'))

const homeroute=require("./routes/home.js")
const loginroute=require("./routes/login.js")
const catalogueroute=require("./routes/catalogue.js")

app.use("/",homeroute)
app.use("/",loginroute)
app.use("/",catalogueroute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});