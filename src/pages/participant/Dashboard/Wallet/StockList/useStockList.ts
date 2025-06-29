import { useUser } from '@hooks/useUserQuery';
import { useEffect, useState } from 'react';
import { ExistStock } from 'types/stock';

export default function useStockList() {
  const { data: userData } = useUser();
  const [stockList, setStockList] = useState<ExistStock[]>([]);

  useEffect(() => {
    const transformStockList = () => {
      if (!userData) return;
      return Object.keys(userData.data?.stock_list).map((item) => {
        const stock = userData.data?.stock_list[item];
        stock.id = Number(item);
        return stock;
      });
    };

    const transformedStockList = transformStockList();
    if (transformedStockList) {
      setStockList(transformedStockList);
    }
  }, [userData?.data.stock_list]);

  return { stockList };
}
