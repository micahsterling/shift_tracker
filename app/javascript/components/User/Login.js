import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import {
  UserWrapper,
  UserWindow,
  Form,
  Button,
  LinkWrapper,
  Input,
  Aria,
  UserLink,
  Title,
  Label,
} from "./UserElements";

const LOGIN_URL = "/sessions";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

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
        <Aria
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </Aria>
        <Title>Please Log In</Title>
        <Form onSubmit={handleSubmit}>
          <Label> Email: </Label>
          <Input
            type="email"
            id="email"
            ref={userRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
            required
          />
          <Label> Password: </Label>
          <Input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            required
          />
          <Button type="submit">Sign In</Button>
          <LinkWrapper>
            <UserLink to="/signup">Sign Up</UserLink>
          </LinkWrapper>
        </Form>
      </UserWindow>
    </UserWrapper>
  );
};

export default Login;
