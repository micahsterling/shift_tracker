import React, { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  UserWrapper,
  UserWindow,
  Form,
  Button,
  UserLink,
  Input,
  Aria,
  Text,
  LinkWrapper,
  Title,
  Label,
  Check,
  Hide,
  Times,
} from "./UserElements";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = PWD_REGEX.test(password);
    if (!valid) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post("users", { name, email, password });
      // login after user is created
      let response = await axios.post("sessions", { email, password });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.jwt;
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("name", response.data.name);
      navigate("/organizations");
      //clear state and controlled inputs
      setName("");
      setEmail("");
      setPassword("");
      setMatchPwd("");
    } catch (err) {
      alert(err);
      errRef.current.focus();
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
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Name:</Label>
          <Input
            type="name"
            id="name"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <Label>Email:</Label>
          <Input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Label>
            Password:
            {validPwd ? <Check icon={faCheck} /> : <Hide />}
            {validPwd || !password ? <Hide /> : <Times icon={faTimes} />}
          </Label>
          <Input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <Text id="pwdnote" show={pwdFocus && !validPwd ? true : false}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </Text>

          <Label>
            Confirm Password:
            {validMatch && matchPwd ? <Check icon={faCheck} /> : <Hide />}
            {validMatch || !matchPwd ? <Hide /> : <Times icon={faTimes} />}
          </Label>
          <Input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <Text
            id="confirmnote"
            show={matchFocus && !validMatch ? true : false}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Confirm password does not match.
          </Text>
          <Button disabled={!validPwd || !validMatch ? true : false}>
            Sign Up
          </Button>
        </Form>
        <Text>Already registered?</Text>
        <LinkWrapper>
          <UserLink to="/">Sign In</UserLink>
        </LinkWrapper>
      </UserWindow>
    </UserWrapper>
  );
};

export default Register;
