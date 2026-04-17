import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const url = window.location.hostname === 'localhost' ? 'http://localhost:4000' : window.location.hostname === '172.16.2.39' ? 'http://172.16.2.39:4000' : 'https://react-ecommerse-websiter.onrender.com';

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [isFoodListLoading, setIsFoodListLoading] = useState(true); // ✅ loading state

  const fetchApi = async (path, method = "GET", payload = null, tokenValue = null) => {
    const headers = {};
    let body;

    if (payload !== null) {
      if (payload instanceof FormData) {
        body = payload;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(payload);
      }
    }

    if (tokenValue) {
      headers.token = tokenValue;
    }

    const response = await fetch(url + path, {
      method,
      headers,
      body,
    });
    const data = await response.json();
    return { response, data };
  };

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await fetchApi("/api/cart/add", "POST", { itemId }, token);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await fetchApi("/api/cart/remove", "POST", { itemId }, token);
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
      const { response, data } = await fetchApi("/api/food/list");
      if (response.ok && data.success) {
        setFoodList(data.data);
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
      const { response, data } = await fetchApi("/api/cart/get", "GET", null, token);
      const cart = data.cartData || data; // fallback if cartData is missing
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




  const [transection_id, setTransection_id] = useState()
  const [paymentTotalAmount, setPaymentTotalAmount] = useState()


  {/*notification related code i have write here*/ }

  const [GlobalNotification, setGlobalNotification] = useState(false)

  const [text, setText] = useState({
    text: "",
    Icon: "",
    message: ""
  })

  console.log(text)

  // useEffect(async () => {
  //   const response = await fetch(url + "/api/user/login")
  //   const result = await response.json();
  //   if (result.success) {
  //     setText({
  //       text: result.notification.text,
  //       Icon: result.notification.Icon,
  //       message: result.notification.message,
  //     })
  //   }
  // }, [url])

  const contextValue = {
   
    GlobalNotification,
    setGlobalNotification,
    setText,
    text,

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
