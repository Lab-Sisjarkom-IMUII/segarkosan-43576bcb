import axios from "axios";

// Gunakan environment variable atau fallback ke localhost untuk development
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://segarkosan-v2.testingfothink.my.id" ||
  "http://localhost:5000";

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Opsional: Tambahkan jika backend membutuhkan credentials (cookies)
  withCredentials: true,
});
