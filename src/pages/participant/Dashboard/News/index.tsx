import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { getNewsList } from '@apis/api/wallet';
import { useQuery } from 'react-query';
import { defaultAlert } from '@utils/customAlert';
import { useNavigate } from 'react-router-dom';

interface NewsList {
  com_name: string;
  description: string;
  isGood: boolean;
}

function News() {
  const navigate = useNavigate();
  const [roomCode] = useRecoilState(roomCodeState);

  // 뉴스 리스트 가져오기
  const getNews = async () => {
    if (!roomCode) {
      defaultAlert('오류가 발생했습니다.');
      setTimeout(() => {
        navigate('/participant', { replace: true });
      }, 1000);
      return [];
    }

    const newsList = await getNewsList(roomCode);
    const nNewsList = newsList.descriptions.map(
      (description: string, index: number) => {
        return {
          com_name: newsList.com_name[index],
          description,
          isGood: newsList.isGood[index],
        };
      }
    );

    return nNewsList;
  };

  const { data: newsList } = useQuery<NewsList[]>('newsList', getNews, {
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
  });

  return (
    <NewsContainer>
      <NewsListWrapper>
        {newsList &&
          newsList.map((news, index) => {
            return (
              <NewsListItem key={index}>
                <p>{news.description}</p>
                <p>{news.com_name}</p>
              </NewsListItem>
            );
          })}
      </NewsListWrapper>
    </NewsContainer>
  );
}

const NewsContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 360px;
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;

  & > h3 {
    color: #000000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const NewsListWrapper = styled.ul`
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NewsListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 8px 18px;
  border-bottom: 1px solid #000000;
  color: #000000;
  gap: 8px;

  & > p:first-child {
    color: #000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  & > p:last-child {
    color: #000;
    text-align: right;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export default News;
