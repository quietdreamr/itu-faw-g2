const express = require("express")
const router = express.Router()

const path = require('path');
  
router.get("/product",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../product.html'));
})

router.get('/product.html', function(req, res) {
    res.redirect('/product');
});
  
module.exports=router