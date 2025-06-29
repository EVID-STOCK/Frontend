import useGetNewsQuery from './useGetNewsQuery';
import * as S from './styles';
import NewsListItem from './components/NewsListItem';

function News() {
  const { data: newsListData } = useGetNewsQuery();

  return (
    <S.NewsContainer>
      <S.NewsListWrapper>
        {newsListData?.map((news) => {
          return (
            <NewsListItem
              companyName={news.com_name}
              description={news.description}
            />
          );
        })}
      </S.NewsListWrapper>
    </S.NewsContainer>
  );
}

export default News;
