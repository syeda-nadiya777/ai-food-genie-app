import { Routes, Route } from "react-router-dom";
import Checkout from "./pages/CheckoutPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/CartPage";
import Profile from "./pages/ProfilePage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;