import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import {
  UserWrapper,
  UserWindow,
  Form,
  Button,
  UserLink,
} from "./UserElements";

const LOGIN_URL = "/sessions";

const Login = () => {
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.jwt;
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("name", response.data.name);
      navigate("/organizations");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <UserWrapper>
      <UserWindow>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Please Log In</h1>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email"> Email: </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
            required
          />
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            required
          />
          <div>
            <Button type="submit">Sign In</Button>
          </div>
          <UserLink>
            <Link to="/signup">Sign Up</Link>
          </UserLink>
        </Form>
      </UserWindow>
    </UserWrapper>
  );
};

export default Login;
