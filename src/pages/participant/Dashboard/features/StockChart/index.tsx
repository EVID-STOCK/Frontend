import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as S from './styles';
import useStockChart from './hooks/useStockChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function StockChart() {
  const { chartRef, chartData, options, maxValue, minValue, isLoading } =
    useStockChart();

  return (
    <>
      <S.LineChartContainer>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            <S.Label>
              <p>최고 {maxValue}</p>
              <p>최저 {minValue}</p>
            </S.Label>
            <Line
              ref={chartRef}
              data={chartData}
              options={options}
              plugins={[ChartDataLabels]}
            />
            <S.Notice>30초마다 갱신됩니다</S.Notice>
          </>
        )}
      </S.LineChartContainer>
    </>
  );
}

export default React.memo(StockChart);
