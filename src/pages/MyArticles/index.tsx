import  { useContext, useEffect, useState } from 'react';
import { getFirestore, collection, query, where,orderBy, getDocs } from "firebase/firestore";
import { AuthContext } from '../../context/authContext';
import Header from '../../components/Header';
import formatDate from '../../utils/formatDate';
import IArticle from './types/articleType';
import * as S from './styles';

const MyArticles: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    if(user){
      (async function(){
        const db = getFirestore();
        const q = query(collection(db, "articles"), where("uid", "==", user.uid), orderBy("updatedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const docs: IArticle[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as IArticle; 
          docs.push({
            ...data,
            id: doc.id,
          });
        });
        setArticles(docs);
      })();
    }
  }, [user?.uid]);

  return <>
    <Header/>
    <S.Main>
      <S.Title>My Articles</S.Title>
      {articles.map(article => (
        <S.Article key={article.id}>
          <S.Image src={article.image || ''} alt={article.title}/>
          <S.TextContent>
            <div>
              <S.ArticleTitle>{article.title}</S.ArticleTitle>
              <S.Date>{formatDate(article.updatedAt)}</S.Date>
              <S.SmallDescription>{article.smallDescription}</S.SmallDescription>
            </div>
            <S.Actions>
              <S.View to={`/article/${article.id}`}>View</S.View>
              <S.Edit to={`/edit-article/${article.id}`}>Edit</S.Edit>
            </S.Actions>
          </S.TextContent>
          </S.Article>
      ))}
    </S.Main>
  </>;
}

export default MyArticles;