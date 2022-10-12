import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc} from 'firebase/firestore';
import { AuthContext } from "../../context/authContext";
import formatDate from '../../utils/formatDate';
import Header from "../../components/Header";
import IArticle from './types/articleType';
import * as S from './styles';
import Loading from "../../components/Loading";

const Article: React.FC = () => {
  const params = useParams();
  const {user} = useContext(AuthContext);

  const [article, setArticle] = useState<IArticle>();

  useEffect(() => {
    (async function(){
      if(params.id){
        const db = getFirestore();
        const docRef = doc(db, "articles", params.id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const currentArticle = docSnap.data() as IArticle;
          setArticle(currentArticle);
        }
      }
    })();
  }, [params.id]);

  if(!article){
    return <Loading/>
  }

  return <>
    <Header/>
    <S.Main>
      <S.Header>
        <div>
          <S.Title>{article.title}</S.Title>
          <S.Date>{formatDate(article.updatedAt)}</S.Date>
        </div>
        {(user?.uid === article.uid  || user?.admin) && <S.Edit to={`/edit-article/${params.id}`}>Edit</S.Edit>}
      </S.Header>
      
      {!!article.image && <S.Image src={article.image} alt={article.title}/>}
      <S.Content>{article.content}</S.Content>
    </S.Main>
  </>;
}

export default Article;