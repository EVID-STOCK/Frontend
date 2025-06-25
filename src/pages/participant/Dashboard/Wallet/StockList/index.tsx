import { useUser } from '@hooks/useUserQuery';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import * as S from './styles';
import { ExistStock } from 'types/stock';
import useSlidingPanel from '@hooks/useSlidingPanel';

export default function StockList() {
  const { data: userData } = useUser(); // user + stock
  const [stockList, setStockList] = useState<ExistStock[]>([]);
  const setCompanyStock = useSetRecoilState(selectedCompanyStockState);
  const { openSliding } = useSlidingPanel();

  useEffect(() => {
    if (userData && userData?.data?.stock_list) {
      const stockList = Object.keys(userData.data?.stock_list).map((item) => {
        const stock = userData.data?.stock_list[item];
        stock.id = Number(item);
        return stock;
      });
      setStockList(stockList);
    }
  }, [userData?.data.stock_list]);

  return (
    <>
      {stockList.length === 0 ? (
        <S.StockListEmptyMessage>
          <p>
            뉴스를 분석하고 주가가 오를것 같은
            <br />
            기업의 주식을 구매하세요!
          </p>
        </S.StockListEmptyMessage>
      ) : (
        <S.StockListContainer>
          <h3>주식 목록</h3>
          <S.StockListWrapper>
            {stockList.length
              ? stockList.map((stock: ExistStock, index: number) => {
                  return (
                    <S.StockListItem
                      $color={
                        stock.percent > 0
                          ? 'red'
                          : stock.percent === 0
                          ? 'black'
                          : 'blue'
                      }
                      key={index}
                      onClick={() => {
                        setCompanyStock({
                          id: stock.id as number,
                          companyName: stock.com_name,
                          inStock: stock.count,
                          firstMenuPrice: stock.buy_average,
                          secondMenuPrice: stock.current_price,
                          percent: stock.percent,
                          difference: stock.difference_price,
                        });
                        openSliding();
                      }}
                    >
                      <div>
                        <p>{stock.com_name}</p>
                        <p>{stock.count}주</p>
                      </div>
                      <div>
                        <p>{stock.buy_average.toLocaleString('ko-KR')}</p>
                        <p>{stock.percent.toFixed(2)}%</p>
                      </div>
                    </S.StockListItem>
                  );
                })
              : null}
          </S.StockListWrapper>
        </S.StockListContainer>
      )}
    </>
  );
}
