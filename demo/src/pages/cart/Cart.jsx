import React, { useContext } from 'react'
import { StoreContext } from "../../context/StoreContext"
import "./Cart.css"
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const { cartItem, food_list, removeFromCart,getTotalCartAmount,url} = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((e, index) => {
            if (cartItem[e._id] > 0) {
              return (
                <div key={e._id}>
                  <div className=" cart-items-item">
                    
                    <img src={url + "/images/" + e.image} alt="" className='item-0'/>
                    <p className='item-1'>{e.name}</p>
                    <p className='item-2'><b>Price </b>${e.price}</p>
                    <p className='item-3'><b>Quantity </b>{cartItem[e._id]}</p>
                    <p className='item-4'><b>Total </b>${e.price * cartItem[e._id]}</p>
                    <b className='cross item-5' onClick={() => removeFromCart(e._id)}>cancel</b>
                  </div>
                  <hr />
                </div>
              )
            }
          })}
        </div>

        <div className="cart-bottom">
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
                <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-detail">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
            </div>
            <button onClick={()=>navigate("/order")}>Process to Checkout</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promo code ' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


  )
}

export default Cart