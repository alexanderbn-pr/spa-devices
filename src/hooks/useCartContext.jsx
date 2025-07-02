import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(() => {
    const stored = localStorage.getItem('cartItemsCount');
    //comprobar que el numero es in integer en base 10
    return stored ? parseInt(stored, 10) : 0;
  });

  return (
    <CartContext.Provider value={{ cartItemsCount, setCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
