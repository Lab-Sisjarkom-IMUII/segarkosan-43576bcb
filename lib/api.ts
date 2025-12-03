import axios from "axios";

const API_URL = "https://17036dcd4c93.ngrok-free.app"; // backend Express

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
