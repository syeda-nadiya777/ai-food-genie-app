const express = require("express");
const {getAllRestaurants, getRestaurant} = require("../controllers/restaurantController")

const router = express.Router();


router.route("/").get(getAllRestaurants)
router.route("/:storeId").get(getRestaurant)

module.exports = router;