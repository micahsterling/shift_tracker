import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem 0.5rem;
`;
export const UserWindow = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  background-color: #16236b;
  font-family: "RM Neue", sans-serif;
  font-size: 22px;
  color: #fff;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
  background-color: #16236b;
`;

export const Label = styled.label`
  margin: 0.35rem 0;
`;

export const Input = styled.input`
  font-size: 22px;
`;

export const Button = styled.button`
  font-family: "RM Neue", sans-serif;
  font-size: 20px;
  padding: 0.25rem;
  margin-top: 0.8rem;
  border-radius: 0.5rem;
  background-color: #c7d1f8;
`;

export const LinkWrapper = styled.div`
  padding: 4px 0;
`;
export const UserLink = styled(Link)`
  color: #9bf8ff;
`;

export const Hide = styled.p`
  display: none;
`;
export const Check = styled(FontAwesomeIcon)`
  color: limegreen;
  margin-left: 0.25rem;
`;

export const Times = styled(FontAwesomeIcon)`
  color: red;
  margin-left: 0.25rem;
`;

export const Text = styled.p`
  font-size: 0.75rem;
  border-radius: 0.5rem;
  background: #000;
  color: #fff;
  padding: 0.25rem;
  position: ${({ show }) => (show ? "relative" : "absolute")};
  left: ${({ show }) => (show ? 0 : "-9999px")};
  bottom: -10px;
`;

export const Aria = styled.p`
  background-color: lightpink;
  color: firebrick;
  font-weight: bold;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  position: ${({ show }) => (show ? "relative" : "absolute")};
  left: ${({ show }) => (show ? 0 : "-9999px")};
`;
export const Title = styled.h1``;
