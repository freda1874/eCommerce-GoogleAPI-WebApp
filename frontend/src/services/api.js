import axios from 'axios';

export const saveItem = async (itemData) => {
  try {
    const response = await axios.post('/api/savedItems/save', itemData);
    return response.data;
  } catch (error) {
    console.error('Error saving item:', error);
    throw error;
  }
};

export const getSavedItems = async (userId) => {
  try {
    const response = await axios.get(`/api/savedItems/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving items:', error);
    throw error;
  }
};

export const getSavedItemsByCategory = async (userId, category) => {
  try {
    const response = await axios.get(`/api/savedItems/user/${userId}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving items by category:', error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    await axios.delete(`/api/savedItems/delete/${itemId}`);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

