// Importing the module
const express=require("express")
const router=express.Router()
  
const path = require('path');

// Handling login request
router.get("/login",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../login.html'));
})

module.exports=router