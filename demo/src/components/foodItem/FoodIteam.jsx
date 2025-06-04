import React,{useState} from 'react'
import "./FoodIteam.css"
import { assets } from '../../assets/assets'
const FoodIteam = ({id,name,price,description,image}) => {

    const [itemCount,setIteamCount]=useState(0)

  return (
    <div className='food-item m-3 col-sm-5  col-md-3 col-lg-2  '>
        <div className="food-item-img-container">
            <img className="food-item-image img-fluid my-3 rounded  " src={image} alt="" />
            
            {!itemCount
            
            ?<img className='add' onClick={()=>setIteamCount(prev=>prev+1)} src={assets.add_icon_white}></img>
            
            :
            <div className="food-item-counter">
                <img onClick={()=>setIteamCount(prev=>prev-1)} src={assets.remove_icon_red}/>
                <p>{itemCount}</p>
                <img onClick={()=>setIteamCount(prev=>prev+1)} src={assets.add_icon_green}/>
            </div>
            }
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