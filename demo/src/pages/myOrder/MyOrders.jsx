import React from 'react'
import "./MyOrders.css"
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useEffect, useState } from 'react'
import axios from "axios"
import { assets } from "../../assets/assets.js"
const MyOrders = () => {

  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOder = async () => {
    const response = await axios.post(url + "/api/payment/userOrders", {}, { headers: { token } });
    setData(response.data.data);
    console.log(response.data.data);
  };


  useEffect(() => {
    if (token) {
      fetchOder()
    }
  }, [token])

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">

        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item, index) => {

                if (index === order.items.length - 1) {
                  return (
                    item.name + "X" + item.quantity
                  )
                }
                else {
                  item.name + "X" + item.quantity + ","
                }

              })}</p>

              <p>${order.amount}</p>
              <p>items;{order.items.length}</p>
              <p><span></span><b>{order.status}</b></p>
              <button>Track order</button>
            </div>
          )
        })}
      </div>
    </div>

  )
}


export default MyOrders