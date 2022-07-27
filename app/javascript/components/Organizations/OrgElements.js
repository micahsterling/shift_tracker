import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  padding: 0 15px;
  width: 100%;
  max-width: 1000px;
`;

export const TextWrap = styled.div``;
export const Text = styled.p`
  padding: 5px 0;
`;
export const ListTitle = styled.h1`
  padding: 10px 0;
`;
export const List = styled.div``;
export const Form = styled.form`
  display: flex;
  padding: 1rem;
  gap: 8px;
`;
export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 100%;
`;
export const Input = styled.input`
  max-width: 150px;
  font-size: 100%;
  border-block-width: 1px;
  margin: 0.2rem 0;
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
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background-color: #1c84ff;
  }
`;
