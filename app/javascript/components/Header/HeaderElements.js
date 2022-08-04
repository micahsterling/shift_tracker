import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 30px;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0.67em 0;
  font-size: 40px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0.8rem;
`;

export const Left = styled.div`
  display: flex;
  justify-content: left;
  margin: 10px;
`;
export const Right = styled.div`
  display: flex;
  justify-content: right;
  margin: 10px;
`;
export const User = styled.h3`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  text-align: center;
  color: #fff;
  background-color: #0276ff;
  border-radius: 8px;
  border-style: none;
  font-family: "RM Neue", sans-serif;
  font-size: 100%;
  margin: 8px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #a7c4f1;
  }
`;
