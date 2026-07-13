import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

function Restaurant() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const res = await API.get(`/eats/stores/${id}`);
      setRestaurant(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!restaurant) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Restaurant...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <img
        src={restaurant.images[0]?.url}
        alt={restaurant.name}
        className="img-fluid rounded shadow"
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
        }}
      />

      <div className="mt-4">

        <h2>{restaurant.name}</h2>

        <p>{restaurant.address}</p>

        <h5>⭐ {restaurant.ratings}</h5>

        <p>
          {restaurant.isVeg ? "🥗 Pure Veg" : "🍗 Non Veg"}
        </p>

        <hr />

        <h3>🤖 AI Review Summary</h3>

        <div className="alert alert-success">
          <ul>
            <li>🍽 Excellent taste loved by customers.</li>
            <li>🚚 Fast delivery and neat packaging.</li>
            <li>🥘 Generous food quantity.</li>
            <li>⭐ Highly recommended by most reviewers.</li>
            <li>💰 Great value for money.</li>
          </ul>
        </div>

        <button
          className="btn btn-success btn-lg"
          onClick={() => {
            addToCart(restaurant);
            alert(`${restaurant.name} added to cart!`);
          }}
        >
          🛒 Add to Cart
        </button>
        <h4 className="text-success">
  ₹{restaurant.price}
</h4>

      </div>

    </div>
  );
}

export default Restaurant;