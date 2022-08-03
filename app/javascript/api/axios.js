import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://tanda-web-app.herokuapp.com/api/v1"
      : "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
