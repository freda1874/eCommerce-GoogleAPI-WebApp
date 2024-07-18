import React, { useContext } from 'react';
import { UserContext } from '../contexts/user';
import { saveItem } from '../services/api';
import './itemDetails.css'; 

const ItemDetails = ({ itemModel }) => {
  const { user } = useContext(UserContext);

  const handleSave = async () => {
    if (!user) {
      alert('You need to log in to save items');
      return;
    }

    console.log('User:', user);  // Log user
    console.log('Item Model:', itemModel);  // Log itemModel

    if (!itemModel._id) {
      console.error('Item Model is missing id:', itemModel);
      alert('Item cannot be saved due to missing id');
      return;
    }

    try {
      const itemData = {
        userId: user.id,
        itemId: itemModel._id,
        title: itemModel.name,
        category: 'default',
        image: itemModel.image,
        link: itemModel.link
      };
      console.log('Saving item:', itemData);  // Log itemData
      const response = await saveItem(itemData);
      console.log('Save item response:', response); 
      alert('Item saved successfully');
    } catch (error) {
      console.error('Error saving item', error.response ? error.response.data : error.message);
      alert('Failed to save item: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div className="item-card">
      <a href={itemModel.link} target="_blank" rel="noopener noreferrer">
        <div className="image-container">
          <img src={itemModel.image} alt={itemModel.name} className="item-image" />
        </div>
        <div className="item-info">
          <h4 className="item-title">{itemModel.name ? itemModel.name : "No name available"}</h4>
        </div>
      </a>
      <div className="item-buttons">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ItemDetails;
