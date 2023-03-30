// Importing express module
const express=require("express")
const router=express.Router()

const path = require('path');
  
// Handling request using router
router.get("/Home",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../index.html'));
})
  
// Importing the router
module.exports=router