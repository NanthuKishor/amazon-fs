import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, rating, image }) {
  const [state, dispatch] = useStateValue();
  // console.log(state.basket);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {/* declaring Array of some number, then filling it with star as the value, then printing out the numeber of stars based on the entered value inside the array. */}
          {Array(rating)
            .fill("🌟")
            .map((i) => (
              <p>{i}</p>
            ))}
        </div>
      </div>
      <img src={image} alt="lean startup.jpg" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
