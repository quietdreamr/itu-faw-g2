const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

async function readCategories() {
  try {
    const data = await fs.readFile('./public/data/categories.json', 'utf8');
    return JSON.parse(data).categories;
  } catch (error) {
    console.error('Error reading categories file', error);
    throw error;
  }
}

router.get('/api/categories/:attribute/:value', async (req, res) => {
  const { attribute, value } = req.params;

  try {
    const categories = await readCategories();

    const category = categories.filter((wine) => {
      if (typeof wine[attribute] === 'number') {
        return wine[attribute] === parseInt(value, 10);
      } else if (typeof wine[attribute] === 'string') {
        return wine[attribute].toLowerCase().includes(value.toLowerCase());
      }
    })[0];

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.send(category);
  } catch (error) {
    res.status(500).send('Error reading categories file');
  }
});

router.get('/api/categories/', async (req, res) => {
  try {
    const categories = await readCategories();
    res.send(categories);
  } catch (error) {
    res.status(500).send('Error reading categories file');
  }
});

module.exports = router;
