import { useContext } from 'react';
import { BookmarkContext } from '../../context/bookmarksContext';
import Header from '../../components/Header';
import ArticleCard from '../../components/ArticleCard';
import * as S from './styles';

const Bookmarks = () => {
  const { bookmarks } = useContext(BookmarkContext);
  return (
    <>
      <Header/>
      <S.Container>
        <S.Main>
          <S.Title>
            Bookmarks!
          </S.Title>
          {bookmarks.length ? <S.Articles>
            {bookmarks.map(article => (<ArticleCard key={article.id} article={article}/>))}
          </S.Articles>: <S.NoBookmarks>No bookmarks yet</S.NoBookmarks>}
        </S.Main>
      </S.Container>
    </>
  )
}

export default Bookmarks;
