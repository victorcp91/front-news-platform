import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Edit = styled(Link)`
  display: block;
  text-decoration: none;
  background-color rgb(244, 98, 98);
  color: white;
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
`;

export const Title = styled.h1`
  margin: 20px 0 0;
`;

export const Image = styled.img`
  margin: 30px 0;
`;

export const Date = styled.time`

`;

export const Content = styled.article`
  white-space: pre-line;
  margin-bottom: 100px;
`;