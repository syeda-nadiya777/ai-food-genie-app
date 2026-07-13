const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./models/restaurant");
console.log(Restaurant);
const restaurants = require("./restaurants_300.json");
const foodImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
];

// Load env variables
dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.DB_URI)
.then(async () => {
    console.log("MongoDB Connected");

    // Optional: remove existing restaurants
    await Restaurant.deleteMany();

    // Insert all restaurants
    const restaurantsWithPrice = restaurants.map((restaurant) => ({
  ...restaurant,

  price: Math.floor(Math.random() * (700 - 150 + 1)) + 150,

  images: [
    {
      public_id: "food",
      url: foodImages[Math.floor(Math.random() * foodImages.length)],
    },
  ],
}));

await Restaurant.insertMany(restaurantsWithPrice);

    console.log(`${restaurants.length} restaurants imported successfully`);

    process.exit();
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});