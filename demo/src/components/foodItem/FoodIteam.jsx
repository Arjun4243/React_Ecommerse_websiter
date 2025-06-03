import React from 'react'
import "./FoodIteam.css"
import { assets } from '../../assets/assets'
const FoodIteam = ({id,name,price,description,image}) => {
  return (
    <div className='food-item col-sm-12 col-md-6 col-lg-3  '>
        <div className="food-item-img-container">
            <img className="food-item-image img-fluid rounded " src={image} alt="" />
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">
                {description}
            </p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodIteam