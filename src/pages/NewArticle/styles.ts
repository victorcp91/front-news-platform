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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 20px;
  label{
    line-height: 28px;
  }
  img{
    display: block;
    width: 100%;
  }
  label, input,textarea, select{
    display: block;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    &.inputError{
      border: 1px solid lightcoral;
    }
  }
  textarea{
    resize: none;
  }
  select{
    max-width: 300px;
  }
  input[type=file]{
    max-width: 300px;
  }
`;

export const RemoveImage = styled.button`
  height: 30px;
  margin-left: 20px;
  border-radius: 100px;
  border:1px solid rgb(31, 34, 44);
  color: rgb(31, 34, 44);
  background: none;
  font-weight: 500;
`;

export const SmallDescription = styled.textarea`
  min-height: 100px;
`;

export const Content = styled.textarea`
  min-height: 300px;

`;

export const Error = styled.span`
  color: lightcoral;
  font-size: 14px;
`


export const SaveAsDraft = styled.button.attrs({ type: 'submit' })`
  margin: 20px auto 0 auto;
  height: 50px;
  border-radius: 100px;
  background-color: rgb(31, 34, 44);
  color: rgb(255, 255, 255);
  width: 100%;
  max-width: 250px;
  font-weight: 500;
`;

export const Publish = styled.button.attrs({ type: 'submit' })`
  margin: 20px auto 0 auto;
  height: 50px;
  border-radius: 100px;
  background-color: lightcoral;
  color: white;
  width: 100%;
  max-width: 250px;
  font-weight: 500;
`;