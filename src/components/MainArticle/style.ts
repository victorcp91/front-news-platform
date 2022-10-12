import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 3px solid rgb(202, 226, 234);
  padding-bottom: 30px;
  height: 300px;
`;

export const Text = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
`;

export const Title = styled.h2``;

export const Description = styled.p``;

export const Date = styled.time``;

export const Image = styled.img`
  display: block;
  width: 50%;
  object-fit: cover;
`;

export const ReadMore = styled(Link)`
  display: block;
  text-decoration: none;
  background-color rgb(244, 98, 98);
  color: white;
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  width: fit-content;
`;