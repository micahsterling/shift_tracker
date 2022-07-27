import styled from "styled-components";
import { Link } from "react-router-dom";

export const Card = styled.div``;

export const OrgTitle = styled.p`
  font-size: 18px;
  padding-top: 10px;
  padding-left: 10px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
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
  font-size: 90%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #1c84ff;
  }
`;

export const BtnLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

// Edit page Style Elements

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 3rem;
`;

export const EditTitle = styled.h1`
  padding: 10px 0;
`;

export const FormContainer = styled.div``;

export const EditLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 100%;
  padding: 0.25rem;
`;
export const EditInput = styled.input`
  max-width: 150px;
  font-size: 100%;
  border-block-width: 1px;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
`;
