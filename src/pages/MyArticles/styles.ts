import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Main = styled.main`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1``;

export const Article = styled.div`
  position: relative;
  display: flex;
  background-color: rgb(202, 226, 234);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  max-height: 300px;
`;

export const ArticleTitle = styled.h2`
  margin: 0;
`;


export const Image = styled.img`
  width: 50%;
  margin-right: 20px;
  object-fit: cover;
`;

export const TextContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Date = styled.time``;

export const SmallDescription = styled.p`
  overflow: hidden;
  max-height: 130px;
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const View = styled(Link)`
  text-decoration: none;
  border: 1px solid rgb(31, 34, 44);
  color: rgb(31, 34, 44);
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  margin-right: 20px;
`;

export const Edit  = styled(Link)`
  text-decoration: none;
  background-color rgb(244, 98, 98);
  color: white;
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
`;