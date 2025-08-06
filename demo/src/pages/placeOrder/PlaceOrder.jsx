import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {

const navigate = useNavigate();


  const { getTotalCartAmount, url, token, food_list, cartItem } = useContext(StoreContext)



  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }


  const placeOrder = async (event) => {

    event.preventDefault();

    let orderItems=[]

    food_list.map((item)=>{
      if(cartItem[item._id]){
        let itemInfo=item;

        itemInfo["quantity"]=cartItem[item._id]

        orderItems.push(itemInfo)
      }
    })

    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }

    let response= axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.sucsess){
      window.location.replace(session_url)
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>

      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required type="text" name="firstName" onChange={onChangeHandler} placeholder='First Name' />
          <input required type="text" name="lastName" onChange={onChangeHandler} placeholder='Last Name' />
        </div>

        <input required type="text" name="email" onChange={onChangeHandler} placeholder='Email Address' />
        <input required type="text" name="street" onChange={onChangeHandler} placeholder='Street' />

        <div className="multi-fields">
          <input required type="text" name='city' onChange={onChangeHandler} placeholder='City' />
          <input required type="text" name="state" onChange={onChangeHandler} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} placeholder='Zip code ' />
          <input required type="text" name="country" onChange={onChangeHandler} placeholder='Country' />
        </div>
        <input required type="text" name="phone" onChange={onChangeHandler} placeholder='Phone' />

      </div>

      <div className="place-order-right">

        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit"  onClick={() =>{ navigate("/order");navigate("/payment")}}>Process to Checkout</button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder