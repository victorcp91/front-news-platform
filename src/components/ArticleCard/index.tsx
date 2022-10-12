import { useState, useContext, useMemo } from 'react';
import { getFirestore, doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import { AuthContext } from '../../context/authContext';
import { BookmarkContext } from '../../context/bookmarksContext';
import IArticle from '../../pages/Home/types/articleType';
import formatDate from '../../utils/formatDate';
import * as S from './styles';

interface IArticleCardProps {
  article: IArticle;
}

const ArticleCard= ({article}: IArticleCardProps) => {
  const [loading, setLoading]= useState(false);
  const {bookmarks, removeBookmark, addBookmark} = useContext(BookmarkContext);
  const {user} = useContext(AuthContext);

  const activeBookmark = useMemo(() => {
    if(bookmarks.find(b => b.id === article.id)){
      return true;
    } return false;
  }, [bookmarks]);

  const toggleBookmark = async () => {
    try{
      setLoading(true);
      const db = getFirestore();
      const docRef = doc(db, "bookmarks", user?.uid || '');
      const docSnap = await getDoc(docRef);
      if(activeBookmark){
        if(docSnap.exists()){
          removeBookmark(article.id);
          updateDoc(docRef, {
            bookmarks: bookmarks.filter(b => b.id !== article.id)
          });
        }
      } else {
        addBookmark({
          ...article
        });
        if(docSnap.exists()){
          updateDoc(docRef, {
            bookmarks: [...bookmarks, article]
          });
        } else {
          setDoc(docRef, {
            bookmarks: [article]
          });
        }
      }
    } catch(err){
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return <S.Container>
    <S.Image src={article.image ||''} alt={article.title}/>
    <S.TextContent>
      <div>
        <S.Title>{article.title}</S.Title>
        <S.Date>{formatDate(article.createdAt)}</S.Date>
        <S.SmallDescription>{article.smallDescription}</S.SmallDescription>
      </div>
      <S.Actions>
        <S.ReadMore to={`/article/${article.id}`}>Read More</S.ReadMore>
        {loading ? 
          <S.BookmarkWait>Wait...</S.BookmarkWait> : 
          <S.Bookmark
          active={activeBookmark}
          onClick={toggleBookmark}>
            {activeBookmark ? 'Remove Bookmark' : 'Add Bookmark'}
        </S.Bookmark>}
      </S.Actions> 
    </S.TextContent>
  </S.Container>;
}

export default ArticleCard;