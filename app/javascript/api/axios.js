import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://shift-tracker.up.railway.app/api/v1" || 'https://shift-tracker.up.railway.app/'
      : "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
