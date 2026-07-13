import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

function Checkout() {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);

      const { data } = await API.post("/payment/process", {
        items: cart,
      });

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="mb-4">💳 Checkout</h2>

        {cart.map((item) => (
          <div
            key={item._id}
            className="d-flex justify-content-between mb-2"
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              ₹{item.quantity * item.price}
            </span>
          </div>
        ))}

        <hr />

        <h3>Total : ₹{total}</h3>

        <button
          className="btn btn-success btn-lg mt-3"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Pay Now"}
        </button>

      </div>
    </div>
  );
}

export default Checkout;