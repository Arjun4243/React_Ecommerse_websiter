import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodIteam from "../foodItem/FoodIteam";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div
      className="food-diaplay d-flex flex-column align-items-center"
      id="food-display"
    >
      <h2>Top dishes near you</h2>

      <div className="food-display-list row justify-content-center">
        {food_list
          .filter((item) => category === "All" || category === item.category)
          .map((item) => (
            <FoodIteam
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;