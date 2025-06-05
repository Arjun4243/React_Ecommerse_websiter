import "./FoodIteam.css";
import { assets } from "../../assets/assets";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

const FoodIteam = ({ id, name, price, description, image }) => {
    const { cartItem, addToCart, removeFromCart } = useContext(StoreContext);
    console.log("id definded", id);
    return (
        <div className="food-item m-3 col-sm-5 col-md-3 col-lg-2 ">
            <div className="food-item-img-container">
                <img
                    className="food-item-image img-fluid my-3 rounded"
                    src={image}
                    alt={name}
                />

                {!cartItem[id] ? (
                    <img
                        className="add"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    ></img>
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove from cart"
                        />
                        <p>{cartItem[id]}</p>
                        <img
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add to cart"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

export default FoodIteam;
