import React, { useEffect, useState } from 'react';
import { getSavedItems, deleteItem, categorizeItem } from '../services/api';

const SavedItemsList = ({ userId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedItems = await getSavedItems(userId);
        setItems(savedItems);
      } catch (error) {
        console.error('Error fetching saved items', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      setItems(items.filter(item => item.itemId !== itemId));
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleCategorize = async (itemId, category) => {
    try {
      const updatedItem = await categorizeItem(itemId, category);
      setItems(items.map(item => (item.itemId === itemId ? updatedItem : item)));
    } catch (error) {
      console.error('Error categorizing item', error);
    }
  };

  return (
    <div>
      <h2>Saved Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.itemId}>
            {item.title} - {item.category || 'No Category'}
            <button onClick={() => handleDelete(item.itemId)}>Delete</button>
            <button onClick={() => handleCategorize(item.itemId, 'New Category')}>Categorize</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedItemsList;
