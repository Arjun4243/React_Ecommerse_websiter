import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodIteam from '../foodItem/FoodIteam'
const FoodDisplay = ({category}) => {

    const {food_list}=useContext(StoreContext)

  return (
    <div className='food-diaplay d-flex flex-column align-items-center' id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list row justify-content-center">
            {food_list.map((item, index) => (
                <FoodIteam
                    key={index}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                />
            ))}
        </div>
    </div>
  )
}

export default FoodDisplay