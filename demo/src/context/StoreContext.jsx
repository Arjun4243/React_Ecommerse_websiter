import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const url="http://localhost:4000";
  const [token,setToken] = useState(""); 

  const [food_list,setFoodList]=useState([])

  const addToCart = async(itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async(itemId) => {
    setCartItems((prev) => (
       ({ ...prev, [itemId]: prev[itemId] - 1 })));


       if(token){
         await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
       }
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

  const fatchFoodList=async()=>{

    const response= await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  const loadCartData=async(token)=>{
    const response= await axios.get(url+"/api/cart/get", {headers:{token}})
    setCartItems(response.data.cartData)
  }
  //this line if when ever auser open own browser then first is got to the it's browser take token value and set it as token then use get that he is login 
  useEffect(()=>{
    

    async function loadData(){
      await fatchFoodList();

      if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));

      await loadCartData(localStorage.getItem("token"));  
    }

    }
    loadData()
  },[])
 
  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};