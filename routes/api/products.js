const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const bodyParser = require('body-parser');

router.use(bodyParser.json());

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

    res.json(product);
  } catch (error) {
    res.status(500).send('Error reading products file');
  }
});

router.get('/api/products/', async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).send('Error reading products file');
  }
});

router.post('/api/products', async (req, res) => {
  try {
    const products = await readProducts();

    const newProduct = req.body;

    const requiredKeys = ['brand', 'description', 'id', 'image', 'list_price', 'name', 'country', 'year', 'category', 'price', 'url'];
    const missingKeys = requiredKeys.filter((key) => !(key in newProduct));

    if (missingKeys.length > 0) {
      return res.status(400).send(`Missing attributes: ${missingKeys.join(', ')}`);
    }

    products.push(newProduct);

    await fs.writeFile('./public/data/products.json', JSON.stringify({ product_data: products }));

    res.json(newProduct);
  } catch (error) {
    console.error('Error adding new product', error);
    res.status(500).send('Error adding new product');
  }
});

router.get('/api/products/:attribute/', async (req, res) => {
  const { attribute } = req.params;

  try {
    const products = await readProducts();

    const values = [...new Set(products.map((product) => product[attribute]))];
    
    res.json(values);
  } catch (error) {
    res.status(500).send('Error reading products file');
  }
});


module.exports = router;
