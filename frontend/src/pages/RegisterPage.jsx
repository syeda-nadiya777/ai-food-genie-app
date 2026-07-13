import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    avatar: "/images/images.png",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/signup", FormData);

      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.data.user));

navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Create Account
        </h2>

        <form onSubmit={registerUser}>

          <input
            className="form-control mb-3"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            onChange={handleChange}
            required
          />

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;