import React, {useState, useEffect, useContext, useRef} from 'react';
import AuthContext from '../Context/AuthProvider';
import {LoginWrapper, LoginWindow, Form, Button} from './LoginElements';
import axios from '../api/axios';

const LOGIN_URL = '/sessions';


const Login = ({}) => {
  const errRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState('')
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    setErrMsg('')
  },[email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      },
        // {
        //   headers: {'Content-Type': 'application/json' },
        //   withCredentials: true
        // }
      );
      console.log(response?.data);
      const accessToken = response?.data?.jwt;
      setAuth({email, password, accessToken });
      setEmail('')
      setPassword('')
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed')
      }
    }
  }


  return (
    <LoginWrapper>
      <LoginWindow>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Please Log In</h1>
        <Form onSubmit={handleSubmit}>
          <label htmlFor='email'> Email: </label>
            <input 
              type="email"
              id='email'
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          <label htmlFor='password'> Password: </label>
            <input 
              type="password"
              id='password'
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          <div>
            <Button type="submit">Sign In</Button>
          </div>
          <div>
            <a href="#">Sign Up</a>
          </div>
        </Form>
      </LoginWindow>
    </LoginWrapper>
  )
}

export default Login