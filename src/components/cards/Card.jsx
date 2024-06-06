import React from 'react';
import './card.css';
import { openDB } from 'idb';
import { updateCartItem, deleteCartItem } from '../../utils/indexedDB';

const Card = ({ id, image, title, description, number, icon, price, deleteIcon }) => {
  const handleDelete = async () => {
    await deleteCartItem(id);
    window.location.reload();
  };

  const handleQuantityChange = async () => {
    const db = await openDB('shopDB', 1);
    const item = await db.get('cart', id);
    item.number += 1;
    await updateCartItem(item);
    window.location.reload();
  };

  return (
    <div className="card">
      <div className="card-content">
        <img src={image} alt={title} />
        <div className="card-text">
          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
        </div>
      </div>
      {number > 0 && (
        <div className="card-page">
          <div className="page_num">
            {number}
            <img className="page_icon" src={icon} alt="Quantity" onClick={handleQuantityChange} />
          </div>
        </div>
      )}
      <div className="delete-part">
        {price && <span className="price_num">${price}</span>}
        {deleteIcon && (
          <button className="delete-button" onClick={handleDelete}>
            <img src={deleteIcon} alt="delete" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
