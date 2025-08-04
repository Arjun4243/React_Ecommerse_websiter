import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const url = "http://localhost:4000";
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
      setFoodList(response.data.data);
      console.log("Fetched food list:", response.data.data); // ✅ log food list
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    } finally {
      setIsFoodListLoading(false); // ✅ mark loading complete
    }
  };

const loadCartData = async (token) => {
  try {
    const response = await axios.get(url + "/api/cart/get", { headers: { token } });
    console.log("Full cart response:", response.data); // ✅ log full response
    const cart = response.data.cartData || response.data; // fallback if cartData is missing
    setCartItems(cart);
    console.log("Loaded cart items:", cart);
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
    isFoodListLoading // ✅ expose loading state
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
