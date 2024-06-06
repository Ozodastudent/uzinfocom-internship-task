import React, { useEffect, useState } from 'react';
import './home.css';
import Card from '../components/cards/Card';
import Form from '../components/form/Form';
import arrowIcon from '../assets/images/arrow.png';
import masterCard from '../assets/images/card1.png';
import vizaCard from '../assets/images/card2.png';
import ruPayCard from '../assets/images/card3.png';
import cardImg1 from '../assets/images/img1.png';
import cardImg2 from '../assets/images/img2.png';
import cardImg3 from '../assets/images/img3.png';
import icon from '../assets/images/icon.png';
import trashcan from '../assets/images/Trashcan.png';
import { getShippingCost } from '../utils/indexedDB';

const Home = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, image: cardImg1, title: 'Italy Pizza', description: 'Extra cheese and toping', number: 1, icon, price: 681, deleteIcon: trashcan },
    { id: 2, image: cardImg2, title: 'Combo Plate', description: 'Extra cheese and toping', number: 1, icon, price: 681, deleteIcon: trashcan },
    { id: 3, image: cardImg3, title: 'Spanish Rice', description: 'Extra garlic', number: 1, icon, price: 681, deleteIcon: trashcan },
  ]);
  const [shipping, setShipping] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchShippingCost = async () => {
      const shippingCost = await getShippingCost();
      setShipping(shippingCost);
      calculateSubtotal();
      calculateTotal();
    };
    fetchShippingCost();
  }, [cartItems]);

  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.number, 0);
    setSubtotal(subtotal);
  };

  const calculateTotal = () => {
    const total = subtotal + shipping;
    setTotal(total);
  };

  const cardImages = [
    { src: masterCard, alt: 'MasterCard' },
    { src: vizaCard, alt: 'Visa' },
    { src: ruPayCard, alt: 'RuPay' },
  ];

  return (
    <div className="home">
      <div className="container">
        <div className="left_card">
          <div className="left_card_header">
            <div className="arrow_icon">
              <img src={arrowIcon} alt="icon" />
            </div>
            <h4 className="header_title">Shopping Continue</h4>
          </div>
          <div className="cards">
            <div className="cards_text">
              <h4 className="cards_title">Shopping cart</h4>
              <p className="cards_desc">You have {cartItems.length} items in your cart</p>
            </div>
            {cartItems.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </div>
        <div className="right_card">
          <Form cardImages={cardImages} subtotal={subtotal} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  );
};

export default Home;
