import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { fetchNewsList } from '@apis/api/wallet';
import { ApiResponse } from '@apis/types/api.types';
import { NewsListResponse } from '@apis/types/wallet.types';

interface NewsList {
  com_name: string;
  description: string;
  isGood: boolean;
}

export default function useGetNewsQuery() {
  const [roomCode] = useRecoilState(roomCodeState);

  function transformNewsData(data: ApiResponse<NewsListResponse>): NewsList[] {
    return data?.data?.descriptions.map((description, index) => ({
      com_name: data.data.com_name[index],
      description,
      isGood: data.data.isGood[index],
    }));
  }

  return useQuery('newsList', () => fetchNewsList(roomCode!), {
    enabled: !!roomCode,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
    select: transformNewsData,
  });
}
