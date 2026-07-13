const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")

const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")

const Restaurant = require("../models/restaurant")

exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(
        Restaurant.find(),
        req.query
    ).search().sort();

    const restaurants = await apiFeatures.query;

    res.status(200).json({
        status: "Success",
        count: restaurants.length,
        restaurants
    })
})

exports.getRestaurant = catchAsyncErrors(async(req,res,next)=>{
    const restaurant = await Restaurant.findById(req.params.storeId);
    if(!restaurant){
        return next(new ErrorHandler("no restaurant found by id",404))
    }
    res.status(200).json({
        status: "Success",
        data: restaurant
    });
});