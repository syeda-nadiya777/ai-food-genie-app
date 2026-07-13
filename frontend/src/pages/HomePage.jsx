import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import API from "../services/api";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [search, restaurants]);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/eats/stores");
      setRestaurants(res.data.restaurants);
      setFilteredRestaurants(res.data.restaurants);
    } catch (err) {
      console.error(err);
    }
  };

  const filterRestaurants = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRestaurants(filtered);
  };

  const showAll = () => {
    setFilteredRestaurants(restaurants);
  };

  const showVeg = () => {
    const veg = restaurants.filter((restaurant) => restaurant.isVeg);
    setFilteredRestaurants(veg);
  };

  const showTopRated = () => {
    const top = restaurants.filter(
      (restaurant) => restaurant.ratings >= 4
    );
    setFilteredRestaurants(top);
  };

  return (
    <div className="container mt-4">

      {/* Hero Banner */}

      <div
        className="text-white rounded shadow mb-5 p-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "350px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.55)",
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "600px",
          }}
        >
          <h1 className="display-4 fw-bold">
            🍔 Food Genie
          </h1>

          <p className="lead">
            Discover delicious food from the best restaurants near you.
          </p>

          <input
            type="text"
            className="form-control mt-3"
            placeholder="🔍 Search Restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Buttons */}

      <div className="d-flex gap-3 flex-wrap mb-4 justify-content-center">

        <button
          className="btn btn-success"
          onClick={showAll}
        >
          🍽 All
        </button>

        <button
          className="btn btn-outline-success"
          onClick={showVeg}
        >
          🥗 Pure Veg
        </button>

        <button
          className="btn btn-outline-warning"
          onClick={showTopRated}
        >
          ⭐ Top Rated
        </button>

      </div>

      {/* Restaurants */}

      <div className="row">

        {filteredRestaurants.length === 0 ? (
          <h4 className="text-center mt-5">
            😔 No Restaurants Found
          </h4>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default Home;