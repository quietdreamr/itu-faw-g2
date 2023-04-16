const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const bodyParser = require('body-parser');

router.use(bodyParser.json());

async function readCartData() {
  try {
    const data = await fs.readFile('./public/data/carts.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading carts file', error);
    throw error;
  }
}

router.get('/api/cart/', async (req, res) => {
    try {
      const cartData = await readCartData();
      res.json(cartData);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const cartData = await readCartData();
      const cart = cartData['cart_data'][id];
      if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const cartData = await readCartData();
  
      const newCartData = req.body;
  
      const requiredKeys = ['product_data', 'count', 'total'];
      const missingKeys = requiredKeys.filter((key) => !(key in newCartData));
  
      if (missingKeys.length > 0) {
        return res.status(400).json({ message: `Missing attributes: ${missingKeys.join(', ')}`});
      }

      console.log(cartData)
      
      cartData['cart_data'][id] = newCartData;

      console.log(cartData)
  
      await fs.writeFile('./public/data/carts.json', JSON.stringify(cartData));
  
      res.json(cartData);
    } catch (error) {
      console.error('Error adding to cart', error);
      res.status(500).json({ message: 'Error adding to cart'});
    }
  });  

  router.delete('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const cartData = await readCartData();
      
      if (!cartData['cart_data'][id]) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      delete cartData['cart_data'][id];
  
      await fs.writeFile('./public/data/carts.json', JSON.stringify(cartData));
  
      res.json({ message: 'Successfully deleted data' });
    } catch (error) {
      console.error('Error deleting data', error);
      res.status(500).json({ message: 'Error deleting data' });
    }
  });
  

module.exports = router;
