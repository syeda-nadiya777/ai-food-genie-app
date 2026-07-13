import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant }) {

  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-md-6 mb-4">

      <div
        className="card h-100 shadow border-0"
        style={{
          borderRadius: "20px",
          cursor: "pointer",
          transition: "0.3s"
        }}
      >

        <img
          src={restaurant.images[0]?.url}
          alt={restaurant.name}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "cover",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px"
          }}
        />

        <div className="card-body">

          <h4>{restaurant.name}</h4>

          <p className="text-muted">
            📍 {restaurant.address}
          </p>

          <h5>
            ⭐ {restaurant.ratings}
          </h5>
          <h5 className="text-success">
  ₹{restaurant.price}
</h5>

          <p>
            {restaurant.isVeg ? "🥗 Pure Veg" : "🍗 Non Veg"}
          </p>

          <button
            className="btn btn-success w-100"
            onClick={() => navigate(`/restaurant/${restaurant._id}`)}
          >
            🤖 View AI Summary
          </button>

        </div>

      </div>

    </div>
  );
}

export default RestaurantCard;