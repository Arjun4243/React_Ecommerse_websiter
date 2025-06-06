import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});

  const addToCart = (e) => {
    if (!cartItem[e]) {
      setCartItems((prev) => ({ ...prev, [e]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [e]: prev[e] + 1 }));
    }
  };

  const removeFromCart = (e) => {
    setCartItems((prev) => (
       ({ ...prev, [e]: prev[e] - 1 }))
    );
  };

  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItem)
    {
      if(cartItem[item]>0){
        let itemInfo=food_list.find((e)=>e._id===item);
        totalAmount += itemInfo.price*cartItem[item]
      }
    }
    return totalAmount
  }
 
  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};