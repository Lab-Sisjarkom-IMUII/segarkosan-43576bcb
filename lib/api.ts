import axios from "axios";

const API_URL = "http://localhost:5000"; // backend Express

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
