import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");

    // Refresh navbar immediately
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <Link className="navbar-brand fw-bold fs-3" to="/">
        🍔 Food Genie
      </Link>

      <ul className="navbar-nav ms-auto d-flex flex-row gap-4 align-items-center">

        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/cart">
            🛒 Cart
            <span className="badge bg-warning text-dark ms-2">
              {cart.length}
            </span>
          </Link>
        </li>

        {!token ? (
          <>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/register">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item text-white">
              👋 Hi, {user?.name}
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/profile">
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-warning btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;