const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeAPI,
} = require("../controllers/paymentController");

router.post("/payment/process", processPayment);

router.get("/stripeapikey", sendStripeAPI);

module.exports = router;