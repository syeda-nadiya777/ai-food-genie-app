const fs = require("fs");

const restaurantNames = [
  "Empire Restaurant",
  "Meghana Foods",
  "Udupi Grand",
  "KFC",
  "Domino's Pizza",
  "Pizza Hut",
  "Burger King",
  "McDonald's",
  "Truffles",
  "A2B",
  "Nandhana Palace",
  "Barbeque Nation",
  "Copper Chimney",
  "Biryani By Kilo",
  "Leon Grill",
  "Beijing Bites",
  "Chai Point",
  "Cafe Coffee Day",
  "The Rameshwaram Cafe",
  "Kritunga",
  "Sukh Sagar",
  "Anand Sweets",
  "Toscano",
  "Imperio",
  "Cafe Noir",
  "Onesta",
  "Empire Deluxe",
  "Corner House",
  "Nagarjuna",
  "Absolute Barbecues"
];

const restaurants = [];

for (let i = 1; i <= 300; i++) {
  restaurants.push({
    name: restaurantNames[Math.floor(Math.random() * restaurantNames.length)] + " " + i,
    isVeg: Math.random() > 0.5,
    address: `${i}, Bangalore, Karnataka`,
    ratings: Number((3 + Math.random() * 2).toFixed(1)),
    numOfReviews: Math.floor(Math.random() * 500),
    location: {
      type: "Point",
      coordinates: [
        Number((77.5 + Math.random() * 0.5).toFixed(6)),
        Number((12.8 + Math.random() * 0.3).toFixed(6))
      ]
    },
    reviews: [
      {
        name: "Rahul",
        ratings: 5,
        Comment: "Amazing food and service."
      },
      {
        name: "Priya",
        ratings: 4,
        Comment: "Good ambience and tasty food."
      }
    ],
    images: [
      {
        public_id: `restaurant_${i}`,
        url: `https://picsum.photos/400/300?random=${i}`
      }
    ]
  });
}

fs.writeFileSync(
  "restaurants_300.json",
  JSON.stringify(restaurants, null, 2)
);

console.log("restaurants_300.json created successfully!");