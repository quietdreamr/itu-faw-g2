const express = require("express")
const router = express.Router()
  
const path = require('path');

router.get("/login",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../login.html'));
})

router.get('/login.html', function(req, res) {
    res.redirect('/login');
});

module.exports=router