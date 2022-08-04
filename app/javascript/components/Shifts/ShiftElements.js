import styled from "styled-components";

export const ShiftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 40px;
`;

export const ShiftTitle = styled.h1`
  padding: 10px 20px;
`;

export const ShiftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  padding: 1rem;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: auto;
`;

export const THead = styled.thead`
  background-color: #75c9fa;
`;

export const TH = styled.th`
  padding: 8px 6px;
`;
export const TR = styled.tr``;

export const Tbody = styled.tbody`
  text-align: center;
`;

export const TD = styled.td`
  border: 1px solid #fff;
  padding: 8px;
  font-size: 18px;
  background-color: #c7e9fc;
`;

export const Input = styled.input`
  font-size: 100%;
  border-block-width: 1px;
  width: 130px;
`;

export const Button = styled.button`
  align-items: center;
  text-align: center;
  color: #fff;
  background-color: #0276ff;
  border-radius: 8px;
  border-style: none;
  font-family: "RM Neue", sans-serif;
  font-size: 90%;
  padding: 5px 15px;
  cursor: pointer;

  &:hover {
    background-color: #a7c4f1;
  }
`;
