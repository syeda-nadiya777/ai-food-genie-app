import { Navigate } from "react-router-dom";

function Profile() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          👤 My Profile
        </h2>

        <hr />

        <h5>
          <strong>Name:</strong> {user?.name}
        </h5>

        <h5>
          <strong>Email:</strong> {user?.email}
        </h5>

        <h5>
          <strong>Phone:</strong> {user?.phoneNumber}
        </h5>

        <h5>
          <strong>Role:</strong> {user?.role}
        </h5>

        <div className="alert alert-success mt-4">
          🎉 Welcome back to <strong>Food Genie</strong>!
        </div>

      </div>

    </div>
  );
}

export default Profile;