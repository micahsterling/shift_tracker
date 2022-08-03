import axios from "axios";

// development url
// export default axios.create({
//   baseURL: "http://localhost:3000/api/v1",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// production baseURL
export default axios.create({
  baseURL: "https://tanda-web-app.herokuapp.com/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
