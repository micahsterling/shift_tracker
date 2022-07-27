import styled from "styled-components";

export const ShiftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShiftTitle = styled.h1`
  padding: 10px 20px;
`;

export const ShiftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: auto;
`;

export const THead = styled.thead`
  background-color: rgb(117, 201, 250);
`;

export const TH = styled.th`
  padding: 8px;
`;
export const TR = styled.tr``;

export const Tbody = styled.tbody``;

export const TD = styled.td`
  border: 1px solid #ffffff;
  text-align: left;
  padding: 8px;
  font-size: 18px;
  background-color: rgb(205, 235, 253);
`;

export const Input = styled.input`
  font-size: 100%;
  border-block-width: 1px;
`;

export const Button = styled.button`
  /* display: flex;
  flex-direction: row;
  flex-shrink: 0; */
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
  margin-left: 0.5rem;

  &:hover {
    background-color: #1c84ff;
  }
`;

export const Form = styled.form`
  display: flex;
  padding: 1rem;
  gap: 8px;
`;
// form td:last-child {
//   display: flex;
//   justify-content: space-evenly;
// }
