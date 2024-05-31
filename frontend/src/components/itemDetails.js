// /*
// * this file is to have the details of an item that will be listed on the front page, every single item will have this
// * layout of the title, the price and the picture to be displayed. A formatter for each item to be shown
// */
// const itemDetails = ({itemModel}) => {
//     return (
//         <div className= "item-Details blue backround">
//             <a href={itemModel.link} target="_blank" rel="noopener noreferrer">
//             <div className="image-container">
//             <img src={itemModel.image} alt={itemModel.name} className="item-image"/>
//             <h4>{itemModel.name}</h4>
//             <p><strong>Price: </strong>{itemModel.price}</p>
//             </div>
//             </a>
//         </div>
//     )
// }

// export default itemDetails

import React from 'react';
// import './ItemDetails.css'; // Import your CSS stylesheet

const ItemDetails = ({ itemModel }) => {
  return (
    <div className="item-card" style={{height: "200px", width:"100%"}}>
      <a href={itemModel.link} target="_blank" rel="noopener noreferrer">
        <div className="image-container">
          <img src={itemModel.image} alt={itemModel.name} className="item-image" style={{height: "140px"}} />
        </div>
        <div className="item-info">
          <h4 className="item-title">{itemModel.name.slice(0,20)}</h4>
          <p className="item-price"><strong>Price: </strong>{itemModel.price}</p>
        </div>
      </a>
    </div>
  );
}

export default ItemDetails;
