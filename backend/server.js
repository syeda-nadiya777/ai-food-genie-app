const dotenv = require("dotenv");

// Load env variables FIRST
dotenv.config({ path: "./config/config.env" });

const app = require("./app");
const connectDatabase = require("./config/database");

// Connect database
connectDatabase();

// Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});