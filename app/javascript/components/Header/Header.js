import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Button,
  HeaderContainer,
  Left,
  Right,
  Title,
  User,
  HeaderWrapper,
} from "./HeaderElements";

function Header() {
  const { logout, show, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Title>Shift Tracker</Title>
      <HeaderWrapper>
        <Left>
          {show ? <Button onClick={() => navigate(-1)}>Back</Button> : <p> </p>}
        </Left>
        <Right>
          <User>Logged in as {currentUser.name}</User>
          <Button onClick={logout}>Log Out</Button>
        </Right>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default Header;
