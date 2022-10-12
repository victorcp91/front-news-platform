import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from '../../context/authContext';
import * as S from './styles';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [userMenu, setUserMenu] = useState(false);

  const {isAuthenticated, clearUser} = useContext(AuthContext);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if(userMenuRef.current && !userMenuRef.current?.contains(event.target as Node)){
        setUserMenu(false);
      }
    }
    if(userMenuRef.current){
      document.addEventListener('click', listener);
    }
    return () => {
      document.removeEventListener('click', listener);
    }
  }, [userMenuRef.current]);

  const toggleUserMenu = () => {
    setUserMenu(prev => !prev);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('NPRT');
      clearUser();
      navigate('/login');
    })
  };

  return <S.Header>
    <S.Logo to="/">NEWS PLATFORM</S.Logo>
    {!!isAuthenticated ? 
      <S.Actions>
        <S.Bookmarks to="/bookmarks">My Bookmarks</S.Bookmarks>
        <div ref={userMenuRef}>
          <S.UserMenuButton onClick={toggleUserMenu}>My Account</S.UserMenuButton>
          {userMenu && <S.UserMenu>
            <li>
              <Link to='/new-article'>New Article</Link>
            </li>
            <li>
              <Link to='/my-articles'>My Articles</Link>
            </li>
            <li>
              <S.Logout onClick={logout}>Logout</S.Logout>
            </li>
          </S.UserMenu>}
        </div>
      </S.Actions> : 
      <S.Actions>
        <S.SignUp to="/signup">Sign Up</S.SignUp>
        <S.Login to="/login">Log In</S.Login>
      </S.Actions>
    }
  </S.Header>;
}

export default Header;