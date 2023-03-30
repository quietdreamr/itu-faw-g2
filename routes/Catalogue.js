const express = require("express")
const router = express.Router()

const path = require('path');

router.get("/catalogue",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../catalogue.html'));
})

router.get('/catalogue.html', function(req, res) {
    res.redirect('/catalogue');
});
  
module.exports=router