import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, orderBy, where, limit, startAfter} from 'firebase/firestore';
import Header from '../../components/Header';
import MainArticle from '../../components/MainArticle';
import ArticleCard from '../../components/ArticleCard';
import Loading from '../../components/Loading';
import categories from '../../constants/categories';
import IArticle from './types/articleType';
import * as S from './styles';


const Home = () => {

  const [lastArticle, setLastArticle] = useState<IArticle>()
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [noMoreArticles, setNoMoreArticles]= useState(false);
  const [lastDoc, setLastDoc] = useState<any>();

  const articlesPerPage = 10;

  const allArticles = async (currentPage: number) => {
    setLoading(true);
    try{
      const db = getFirestore();
      let q;
      if(currentPage > 0){
        q = query(
          collection(db, "articles"),
          where("published", "==", true),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(articlesPerPage)
        );
      } else {
        q = query(
          collection(db, "articles"),
          where("published", "==", true),
          orderBy("createdAt", "desc"),
          limit(articlesPerPage)
        );
      }
      const querySnapshot = await getDocs(q);
      const docs: IArticle[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as IArticle; 
        docs.push({
          ...data,
          id: doc.id,
        });
      });
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      if(!docs.length){
        setNoMoreArticles(true);
      }
      if(currentPage > 0){
        setArticles(currentArticles => [...currentArticles, ...docs]);
      } else {
        setLastArticle(docs[0]);
        setArticles(docs);
      }
    } catch(err){
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = async (currentPage: number) => {
    setLoading(true);
    try{
      const db = getFirestore();
      let q;
      if(currentPage > 0){
        q = query(
          collection(db, "articles"),
          where("published", "==", true),
          where("category", "==", activeFilter),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(articlesPerPage),
        );
      } else {
        q = query(
          collection(db, "articles"),
          where("published", "==", true),
          where("category", "==", activeFilter),
          orderBy("createdAt", "desc"),
          limit(articlesPerPage),
        );
      }
      const querySnapshot = await getDocs(q);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const docs: IArticle[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as IArticle; 
        docs.push({
          ...data,
          id: doc.id,
        });
      });
      if(!docs.length){
        setNoMoreArticles(true);
      }
      if(currentPage > 0){
        setArticles(currentArticles => [...currentArticles, ...docs]);
      } else {
        setArticles(docs);
      }
    } catch(err){
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNoMoreArticles(false);
    if(activeFilter){
      filteredArticles(0);
    } else {
      allArticles(0);
    }
  }, [activeFilter]);

  useEffect(() => {
    if(page > 0){
      if(activeFilter){
        filteredArticles(page);
      } else {
        allArticles(page);
      }
    }
  }, [page]);


  if(!lastArticle){
    return <Loading />
  }

  return (
    <>
      <Header/>
      <S.Container>
        <S.Main>
          <MainArticle article={lastArticle}/>
          <S.Categories>
            <span>Categories</span>
            {categories.map(c => (
              <S.Category
                key={c.value}
                active={activeFilter === c.value}
                onClick={() => setActiveFilter(c.value)}
              >{c.label}</S.Category>
            ))}
            {!!activeFilter && <S.ClearFilter onClick={() => setActiveFilter('')}>Clear filters</S.ClearFilter>}
          
            <S.Articles>
              {articles.map(article => (<ArticleCard key={article.id} article={article}/>))}
            </S.Articles>
          </S.Categories>
          {loading &&  <Loading/>}
          {!loading && !noMoreArticles &&
          <S.LoadMore onClick={() => setPage(last => last+1)}>Load More</S.LoadMore>}
          {!articles.length && !loading && <div>No articles</div>}
        </S.Main>
      </S.Container>
    </>
  )
}

export default Home;
