import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  display: flex;
  background-color: white;
  width: 100%;
  height: 81px;
  padding: 0 36px;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: 1px 2px 5px rgba(0,0,0,.2);
  z-index: 2;
`;

export const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
`;

export const Actions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SignUp = styled(Link)`
  display: block;
  text-decoration: none;
  border: 1px solid rgb(31, 34, 44);
  color: rgb(31, 34, 44);
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  margin: 0 10px;
`;

export const Login = styled(Link)`
  display: block;
  text-decoration: none;
  background-color: rgb(31, 34, 44);
  color: white;
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  margin: 0 10px;
`;


export const Bookmarks = styled(Link)`
  display: block;
  text-decoration: none;
  border: 1px solid rgb(31, 34, 44);
  color: rgb(31, 34, 44);
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  margin: 0 10px;
`;

export const NewArticle = styled(Link)`
  color: rgb(31, 34, 44);
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  margin: 0 10px;
`;

export const UserMenuButton = styled.button`
  display: block;
  background-color: transparent;
  border: 1px solid rgb(31, 34, 44);
  color: rgb(31, 34, 44);
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  margin: 0 10px;
`;

export const UserMenu = styled.ul`
  background-color: rgb(202, 226, 234);
  position: absolute;
  top: 45px;
  right: 15px;
  text-align: center;
  padding: 10px 10px 5px;
  border-radius: 5px;
  li{
    margin: 5px 0 10px 0;
  }
`;

export const Logout = styled.button`
  color: lightcoral;
  background: none;
  font-weight: bold;
`;