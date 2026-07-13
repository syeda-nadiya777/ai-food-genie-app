const express = require("express");
const app = express();

const auth = require("./routes/auth")

const restaurant = require("./routes/restaurant")
const cors = require("cors")
const payment = require("./routes/payment");
// Middleware
app.use(cors());
app.use(express.json())

app.use("/api/v1/users",auth)
app.use("/api/v1/eats/stores",restaurant)
app.use("/api/v1", payment);


module.exports = app;