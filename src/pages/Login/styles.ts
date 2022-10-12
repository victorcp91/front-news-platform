import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;
`;

export const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(202, 226, 234);
  border-radius: 10px;
  padding: 20px;

  label {
    display: block;
    margin-bottom: 10px;
    line-height: 28px;
    width: 100%;
  }

  input {
    margin: 5px 0 0 0;
    padding: 10px;
    width: 100%;
    display: block;
    &.error{
      border: 1px solid lightcoral;
    }
  }

  button {
    margin-top: 20px;
    height: 50px;
    border-radius: 100px;
    background-color: rgb(31, 34, 44);
    color: rgb(255, 255, 255);
    width: 100%;
    max-width: 250px;
    font-weight: 500;
  }
`
export const Error = styled.span`
  color: lightcoral;
  font-size: 14px;
`

export const SignUpMessage = styled.div`
  margin: 10px 0 0;
`;