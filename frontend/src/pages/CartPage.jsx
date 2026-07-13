import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>🛒 Your Cart</h2>
        <p className="text-muted">Your cart is empty.</p>
      </div>
    );
  }

 

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
  (sum, item) => sum + item.quantity * item.price,
  0
);

  return (
    <div className="container mt-5">

      <h2 className="mb-4">🛒 My Cart</h2>

      {cart.map((item) => (
        <div className="card shadow mb-4" key={item._id}>
          <div className="row g-0">

            <div className="col-md-4">
              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="img-fluid rounded-start"
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-md-8">

              <div className="card-body">

                <h3>{item.name}</h3>

                <p>{item.address}</p>

                <p>⭐ {item.ratings}</p>

                <h5 className="text-success">
  ₹{item.price}
</h5>

                <div className="d-flex align-items-center gap-3 mt-3">

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    −
                  </button>

                  <h5 className="mb-0">
                    {item.quantity}
                  </h5>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="btn btn-outline-danger mt-4"
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                >
                  ❌ Remove Item
                </button>

              </div>

            </div>

          </div>
        </div>
      ))}

      <div className="card shadow p-4">

        <h4>Total Items : {totalItems}</h4>

        <h3 className="text-success">
          Total : ₹{totalPrice}
        </h3>

        <button
          className="btn btn-success btn-lg mt-3"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>

      </div>

    </div>
  );
}

export default Cart;