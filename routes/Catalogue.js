// Importing express module
const express=require("express")
const router=express.Router()

const path = require('path');

// Handling request using router
router.get("/Catalogue",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../catalogue.html'));
})
  
// Importing the router
module.exports=router