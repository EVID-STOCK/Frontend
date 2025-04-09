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
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useRecoilValue } from 'recoil';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { roomCodeState } from '@states/host/roomSetState';
import { fetchRoomInfo } from '@apis/api/game';
import { fetchStockGraph } from '@apis/api/stock';
import { useQuery } from 'react-query';
import { Context } from 'chartjs-plugin-datalabels';

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

function LineChart() {
  const chartRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const companyStock = useRecoilValue(selectedCompanyStockState);
  const persistRoomCode = useRecoilValue(roomCodeState);

  const getRoomInfo = async () => {
    if (!persistRoomCode) return;
    const { data: roomData } = await fetchRoomInfo(persistRoomCode);
    setSeconds(roomData.timeLimit);
  };

  const { data: stockGraphData = [], isLoading } = useQuery(
    ['stockGraph', companyStock.id],
    () => fetchStockGraph(persistRoomCode!, companyStock.id!),
    {
      enabled: !!companyStock.id && !!persistRoomCode,
      refetchOnWindowFocus: false,
      select: (result) => Object.values(result).map((x) => x.stock_price),
    }
  );

  useEffect(() => {
    getRoomInfo();
  }, []);

  const splitTime = (seconds: number) => {
    const timeList = [];
    for (let t = 0; t <= seconds; t += 30) {
      const minutes = Math.floor(t / 60);
      const sec = t % 60;
      timeList.push(
        `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
      );
    }
    return timeList;
  };

  const chartData = {
    labels: splitTime(seconds),
    datasets: [
      {
        label: '주가',
        data: stockGraphData ? stockGraphData : [],
        borderColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.ctx;
          const gradient = ctx.createLinearGradient(0, chart.height, 0, 0);
          gradient.addColorStop(1, 'rgb(57, 92, 184)');
          gradient.addColorStop(0, 'rgb(0, 188, 212)');
          return gradient;
        },
        backgroundColor: 'white',
        tension: 0.1,
      },
    ],
  };

  // 차트 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        formatter: function (value: number, context: Context) {
          const data = stockGraphData ?? [];
          const max = Math.max(...data);
          const min = Math.min(...data);

          const lastMaxIndex = data.lastIndexOf(max);
          const lastMinIndex = data.lastIndexOf(min);

          if (context.dataIndex === 0) {
            return value.toLocaleString('ko');
          }
          if (context.dataIndex === lastMaxIndex) {
            return '최고';
          }
          if (context.dataIndex === lastMinIndex) {
            return '최저';
          }

          return null;
        },
        display: true,
        color: 'rgb(57, 92, 184)',
        anchor: 'center' as 'center' | 'start' | 'end',
        align: 'top' as
          | 'top'
          | 'bottom'
          | 'left'
          | 'right'
          | 'center'
          | 'start'
          | 'end',
      },
    },
    scales: {
      y: {
        display: false,
        // borderWidth: 0,
        min: stockGraphData
          ? Math.min(...stockGraphData) - Math.max(...stockGraphData) / 5
          : 0,
        // 최소값
        max: stockGraphData
          ? Math.max(...stockGraphData) + Math.max(...stockGraphData) / 5
          : 0, // 최대값
        beginAtZero: false, // Y축 0부터 시작하지 않음
        grid: {
          display: true, // 그리드 표시
          // drawOnChartArea: false, // 차트 영역에 그리드 선 그리지 않기
          drawTicks: false, // 눈금 표시하지 않기
          color: 'rgb(0, 0, 0)', // 그리드 색상
          lineWidth: 1, // 그리드 선 두께
          borderDash: [5, 5], // 점선 형태로 표시
          zeroLineColor: 'rgb(0, 0, 0)', // y=0 축의 선 색상
          zeroLineWidth: 2, // y=0 축의 그리드 선 두께
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
    },
  };

  return (
    <>
      <LineChartContainer>
        {isLoading ? (
          <>Loading</>
        ) : (
          <>
            <Label>
              <p>최고 {Math.max(...stockGraphData).toLocaleString('ko')}</p>
              <p>최저 {Math.min(...stockGraphData).toLocaleString('ko')}</p>
            </Label>
            <Line
              ref={chartRef}
              data={chartData}
              options={options}
              plugins={[ChartDataLabels]}
            />
            <Notice>30초마다 갱신됩니다</Notice>
          </>
        )}
      </LineChartContainer>
    </>
  );
}

export default React.memo(LineChart);

const Label = styled.div`
  position: absolute;
  right: 20px;
  top: 5px;
  font-size: 1.1rem;
`;

const LineChartContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 20px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Notice = styled.p`
  padding-top: 10px;
  font-size: 1.1rem;
  color: #686868;
  align-self: self-end;
`;
