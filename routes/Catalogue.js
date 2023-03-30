const express = require("express")
const router = express.Router()

const path = require('path');

router.get("/catalogue",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../catalogue.html'));
})
  
module.exports=router