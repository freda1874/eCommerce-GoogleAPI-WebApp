import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/user';
import '../components/itemDetails.css';

const SavedItems = () => {
  const { user } = useContext(UserContext);
  const [savedItems, setSavedItems] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const response = await axios.get(`/api/savedItems/user/${user.id}`);
        setSavedItems(response.data);
      } catch (error) {
        console.error('Error retrieving saved items:', error);
      }
    };

    if (user) {
      fetchSavedItems();
    }
  }, [user]);

  const handleCategoryChange = async (e) => {
    setCategory(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(`/api/savedItems/user/${user.id}/category/${e.target.value}`);
        setSavedItems(response.data);
      } catch (error) {
        console.error('Error retrieving items by category:', error);
      }
    } else {
      const fetchSavedItems = async () => {
        try {
          const response = await axios.get(`/api/savedItems/user/${user.id}`);
          setSavedItems(response.data);
        } catch (error) {
          console.error('Error retrieving saved items:', error);
        }
      };

      if (user) {
        fetchSavedItems();
      }
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/api/savedItems/delete/${itemId}`);
      setSavedItems(savedItems.filter(item => item.itemId !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCategorize = async (itemId, category) => {
    try {
      const response = await axios.patch(`/api/savedItems/categorize/${itemId}`, { category });
      const updatedItem = response.data;
      setSavedItems(savedItems.map(item => item.itemId === itemId ? updatedItem : item));
    } catch (error) {
      console.error('Error categorizing item:', error);
    }
  };

  return (
    <div>
      <h1>Saved Items</h1>
      <div className="filter-container">
        <label htmlFor="category-select">Filter by Category:</label>
        <select id="category-select" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="jeans">Jeans</option>
          <option value="shirts">Shirts</option>
          <option value="jackets">Jackets</option>
          <option value="shoes">Shoes</option>
          <option value="pants">Pants</option> {}
        </select>
      </div>
      <div className="items-container">
        {savedItems.length > 0 ? (
          savedItems.map((item) => (
            <div key={item._id} className="item-card">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <div className="image-container">
                  <img src={item.image} alt={item.title} className="item-image" />
                </div>
                <div className="item-info">
                  <h4 className="item-title">{item.title ? item.title : "No title available"}</h4>
                </div>
              </a>
              <div className="item-buttons">
                <button onClick={() => handleDelete(item.itemId)}>Delete</button>
                <button onClick={() => handleCategorize(item.itemId, 'New Category')}>Categorize</button>
              </div>
            </div>
          ))
        ) : (
          <p>No saved items available</p>
        )}
      </div>
    </div>
  );
};

export default SavedItems;
