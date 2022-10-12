import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  background-color: rgb(202, 226, 234);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  max-height: 300px;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
`;


export const Image = styled.img`
  width: 50%;
  margin-right: 20px;
  object-fit: cover;
`;

export const Date = styled.time`
  font-size: 14px;
`;

export const SmallDescription = styled.p`
  overflow: hidden;
  max-height: 100px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReadMore = styled(Link)`
  display: block;
  width: 100%;
  text-decoration: none;
  background-color rgb(244, 98, 98);
  color: white;
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

export const BookmarkWait = styled.div`
  display: block;
  border: 1px solid rgb(31, 34, 44);
  color: rgb(31, 34, 44);
  background: none;
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  font-size: 14px;
  font-weight: normal;
`; 

export const Bookmark = styled.button<{active: boolean}>`
  display: block;
  text-decoration: none;
  border: 1px solid rgb(31, 34, 44);
  color: ${props => props.active ? 'white': 'rgb(31, 34, 44)'};
  background: ${props => props.active ? 'rgb(31, 34, 44)': 'none'};
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  font-size: 14px;
`;