import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Order.css';

import { toast } from 'react-toastify';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Correct Bootstrap import

function Order({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/payment/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const statusHandler= async(event,orderId)=>{

    const response=await axios.post(url+"/api/payment/status",{orderId,status:event.target.value})

    if(response.data.success){
      await fetchAllOrders();
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list ">
        {orders.map((order, index) => (
          <div key={index} className="order-item container fw-semibold "> {/* ✅ Grid container */}
            
            <img src={assets.parcel_icon} alt="Parcel Icon" />

            <p className="order-item-food ">
              {order.items.map((item, index) => (
                <span key={index}>
                  {item.name} x {item.quantity}
                  {index !== order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>

            <div className="order-item-name">
              {order.address.firstName + " " + order.address.lastName}
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.zipcode + "," + order.address.country}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p className='text-success'>${order.amount}</p>

            <select onChange={()=>statusHandler(event,order._id)} value={order.status} className="btn btn-success text-decoration-none">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
