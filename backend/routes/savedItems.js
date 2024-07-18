const express = require('express');
const SavedItem = require('../models/SavedItem');

const router = express.Router();

// Middleware for parsing JSON
router.use(express.json());

// Save element
router.post('/save', async (req, res) => {
  console.log("Received request to save item:", req.body);
  const { userId, itemId, title, category, image, link } = req.body;

  if (!userId || !itemId || !title || !category || !image || !link) {
    console.error('Missing required fields:', { userId, itemId, title, category, image, link });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const savedItem = new SavedItem({
    userId,
    itemId,
    title,
    category,
    image,
    link
  });

  try {
    const result = await savedItem.save();
    console.log("Item saved successfully:", result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Error saving item' });
  }
});

// Get the user's saved items
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const items = await SavedItem.find({ userId });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'Error retrieving items' });
  }
});

// Get user's saved items by category
router.get('/user/:userId/category/:category', async (req, res) => {
  const { userId, category } = req.params;

  try {
    const items = await SavedItem.find({ userId, category });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error retrieving items by category:', error);
    res.status(500).json({ error: 'Error retrieving items by category' });
  }
});

// Delete the saved element
router.delete('/delete/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    await SavedItem.deleteOne({ itemId });
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item' });
  }
});

// Categorize the saved element
router.patch('/categorize/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { category } = req.body;

  try {
    const updatedItem = await SavedItem.findOneAndUpdate(
      { itemId },
      { category },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error categorizing item:', error);
    res.status(500).json({ error: 'Error categorizing item' });
  }
});

module.exports = router;
