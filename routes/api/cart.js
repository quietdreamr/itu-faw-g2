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
  

module.exports = router;
