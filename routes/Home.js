const express = require("express")
const router = express.Router()

const path = require('path');
  
router.get("/home",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../index.html'));
})

router.get('/', function(req, res) {
    res.redirect('/home');
});

router.get('/index.html', function(req, res) {
    res.redirect('/home');
});
  
module.exports=router