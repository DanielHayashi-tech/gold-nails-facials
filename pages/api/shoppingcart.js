import React, { useState } from "react";
import Item from "./Item";
import itemsData from "./itemsData";

const ShoppingPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (itemId) => {
    const itemToAdd = itemsData.find((item) => item.id === itemId);
    setCartItems([...cartItems, itemToAdd]);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="items-container">
        {itemsData.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.desc}
            price={item.price}
            img={item.img}
            addItemToCart={addItemToCart}
          />
        ))}
      </div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingPage;
