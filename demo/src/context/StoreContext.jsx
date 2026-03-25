import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
const url = window.location.hostname === 'localhost' ? 'http://localhost:4000' : window.location.hostname === '172.16.2.39' ? 'http://172.16.2.39:4000' : 'https://react-ecommerse-websiter.onrender.com';

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [isFoodListLoading, setIsFoodListLoading] = useState(true); // ✅ loading state

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((e) => e._id === item);
        if (!itemInfo) {
          console.warn(`Item with ID ${item} not found in food_list`);
          continue;
        }
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const fatchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        setFoodList([]);
      }
    } catch (error) {
      console.error("Failed to fetch food list:", error);
      setFoodList([]);
    } finally {
      setIsFoodListLoading(false); // ✅ mark loading complete
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", { headers: { token } });

      const cart = response.data.cartData || response.data; // fallback if cartData is missing
      setCartItems(cart);

    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fatchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  
  const [transection_id,setTransection_id] = useState()
  const [paymentTotalAmount,setPaymentTotalAmount]=useState()
  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    isFoodListLoading,
    setTransection_id,
    transection_id,
    paymentTotalAmount,
    setPaymentTotalAmount,
    

  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
