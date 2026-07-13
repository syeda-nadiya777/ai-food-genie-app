import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow p-5">

        <h1 className="text-success mb-3">
          ✅ Payment Successful
        </h1>

        <h4>Thank you for your order!</h4>

        <p className="text-muted mt-3">
          Your payment has been received successfully.
        </p>

        <Link to="/" className="btn btn-success mt-4">
          Back to Home
        </Link>

      </div>
    </div>
  );
}

export default SuccessPage;