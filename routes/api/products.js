const express = require("express")
const router = express.Router()
const fs = require('fs');

router.get('/products/:attribute/:value', function(req, res){
    const value = req.params.value;
    const attribute = req.params.attribute;
  
    fs.readFile('.\\public\\data\\products.json', 'utf8', (err, data) => {
        
      if (err){
        return res.status(500).send('Error reading products file');
      }
  
      const products = JSON.parse(data)['product_data'];
      let product;
  
      if(typeof(products[0][attribute]) === "number"){
        product = products.filter(wine => wine[attribute] === parseInt(value));
      } else if(typeof(products[0][attribute]) === "string"){
        product = products.filter(wine => wine[attribute].toLowerCase().includes(value.toLowerCase()));
      }
  
      if (!product || product.length === 0) {
        return res.status(404).send('Product not found');
      }
  
      res.send(product);
    });
  });
  

module.exports=router