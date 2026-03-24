<div className="cart-items">
           {food_list.map((e, index) => {
            if (cartItem[e._id] > 0) {
              return (
                <div key={e._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + e.image} alt="" />
                    <p>Title</p><p>{e.name}</p>
                    <p>Price</p><p>${e.price}</p>
                    <p>Quantity</p><p>{cartItem[e._id]}</p>
                    <p>Total</p> <p>${e.price * cartItem[e._id]}</p>
                   <p>Remove</p> <p className='cross' onClick={() => removeFromCart(e._id)}>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })}
     
          <br />
          <hr />
   
        </div>