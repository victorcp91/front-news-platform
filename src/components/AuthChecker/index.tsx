import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc} from 'firebase/firestore';
import { AuthContext } from '../../context/authContext';
import { BookmarkContext } from '../../context/bookmarksContext';
import { IBookmarkData } from '../../context/bookmarksContext';


const AuthChecker = () => {
  const navigate = useNavigate();
  const {user, registerUser, setAdmin} = useContext(AuthContext); 
  const {loadBookmarks} = useContext(BookmarkContext);
  
  useEffect(() => {
    const refreshToken = localStorage.getItem('NPRT');
    if(refreshToken){
      const auth = getAuth();
      const authStatus = onAuthStateChanged(auth, (user) => {
        if(user){
          registerUser(user.email!, user.uid);
        }
      });
      return authStatus();
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    (async function(){
      if(user?.uid){
      try{
        const db = getFirestore();
        const docRef = doc(db, "bookmarks", user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const currentArticles = docSnap.data() as {bookmarks: IBookmarkData[]};
          loadBookmarks(currentArticles.bookmarks);
        }
      } catch(err) {
        console.error(err);
      } 
    }
    })();
  }, [user]);

  useEffect(() => {
    (async function(){
      if(user?.uid){
      try{
        const db = getFirestore();
        const docRef = doc(db, "admins", user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          setAdmin(true);
        }
      } catch(err) {
        console.error(err);
      } 
    }
    })();
  }, [user]);

  return null;
}

export default AuthChecker;