import React from 'react';
import './form.css';
import profileImg from '../../assets/images/person.png';
import rightIcon from '../../assets/images/Right.png';
import { saveOrder, clearCart } from '../../utils/indexedDB';

const Form = ({ cardImages, subtotal, shipping, total }) => {
  const handleCheckout = async () => {
    try {
      await saveOrder({ subtotal, shipping, total, date: new Date() });
      await clearCart();
      alert('Order placed successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again later.');
    }
  };

  return (
    <div className="card-details">
      <div className="header">
        <h2 className="form_title">Card Details</h2>
        <img src={profileImg} alt="Profile" className="profile-pic" />
      </div>
      <h3 className="type_title">Card type</h3>
      <div className="card-type">
        {cardImages.map((image, index) => (
          <img key={index} className="card_image" src={image.src} alt={image.alt} />
        ))}
        <button className="see-all">See all</button>
      </div>
      <div className="input-field">
        <label>Name on card</label>
        <input type="text" placeholder="Name" />
      </div>
      <div className="input-field">
        <label>Card Number</label>
        <input type="text" placeholder="1111 2222 3333 4444" />
      </div>
      <div className="row">
        <div className="input-field">
          <label>Expiration date</label>
          <input type="text" placeholder="mm/yy" />
        </div>
        <div className="input-field">
          <label>CVV</label>
          <input type="text" placeholder="123" />
        </div>
      </div>
      <div className="summary">
        <div className="subtotal">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="shipping">
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>
        <div className="total">
          <span>Total (Tax incl.)</span>
          <span>${total}</span>
        </div>
      </div>
      <button className="checkout" onClick={handleCheckout}>
        <span>${total}</span>
        <span className="check_link">
          Checkout
          <img src={rightIcon} alt="icon" />
        </span>
      </button>
    </div>
  );
};

export default Form;
