import IArticle from '../../pages/Home/types/articleType';
import formatDate from '../../utils/formatDate';
import * as S from './style';

interface IMainArticleProps {
  article: IArticle;
}

const MainArticle = ({article}: IMainArticleProps) => {
  return <S.Container>
    <S.Text>
      <div>
        <S.Title>{article.title}</S.Title>
        <S.Date>{formatDate(article.createdAt)}</S.Date>
        <S.Description>{article.smallDescription}</S.Description>
      </div>
      <S.ReadMore to={`/article/${article.id}`}>Read More</S.ReadMore>
    </S.Text>
    <S.Image src={article.image || ''} alt={article.title}/>
  </S.Container>;
}

export default MainArticle;