const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

async function readProducts() {
  try {
    const data = await fs.readFile('./public/data/products.json', 'utf8');
    return JSON.parse(data).product_data;
  } catch (error) {
    console.error('Error reading products file', error);
    throw error;
  }
}

router.get('/api/products/:attribute/:value', async (req, res) => {
  const { attribute, value } = req.params;

  try {
    const products = await readProducts();

    const product = products.filter((wine) => {
      if (typeof wine[attribute] === 'number') {
        return wine[attribute] === parseInt(value, 10);
      } else if (typeof wine[attribute] === 'string') {
        return wine[attribute].toLowerCase().includes(value.toLowerCase());
      }
    });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.send(product);
  } catch (error) {
    res.status(500).send('Error reading products file');
  }
});

router.get('/api/products/', async (req, res) => {
  try {
    const products = await readProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send('Error reading products file');
  }
});

module.exports = router;
