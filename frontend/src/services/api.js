import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-food-genie-app.onrender.com/api/v1",
});

export default API;