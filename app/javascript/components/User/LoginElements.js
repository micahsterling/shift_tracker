import styled from 'styled-components'

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  padding: 1rem 0.5rem;
`
export const LoginWindow = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  background-color: #16236b;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
  background-color: #16236b;
`

export const Button = styled.button`
  font-family: sans-serif;
  font-size: 22px;
  padding: 0.25rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: #c7d1f8;
`