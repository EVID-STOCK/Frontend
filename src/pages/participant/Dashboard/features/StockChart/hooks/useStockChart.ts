import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { fetchRoomInfo } from '@apis/api/game';
import { Context } from 'chartjs-plugin-datalabels';
import useGetStockGraphQuery from './useGetStockGraphQuery';

export default function useStockChart() {
  const chartRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const persistRoomCode = useRecoilValue(roomCodeState);
  const { data: stockGraphData = [], isLoading } = useGetStockGraphQuery();
  const isHavaStockGraphData = stockGraphData.length > 0;

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
        data: stockGraphData,
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
          const data = stockGraphData;
          const max = isHavaStockGraphData ? Math.max(...data) : 0;
          const min = isHavaStockGraphData ? Math.min(...data) : 0;

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
        min: isHavaStockGraphData
          ? Math.min(...stockGraphData) - Math.max(...stockGraphData) / 5
          : 0,
        max: isHavaStockGraphData
          ? Math.max(...stockGraphData) + Math.max(...stockGraphData) / 5
          : 0,
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

  const maxValue = isHavaStockGraphData
    ? Math.max(...stockGraphData).toLocaleString('ko')
    : 0;
  const minValue = isHavaStockGraphData
    ? Math.min(...stockGraphData).toLocaleString('ko')
    : 0;

  const getRoomInfo = async () => {
    if (!persistRoomCode) return;
    const { data: roomData } = await fetchRoomInfo(persistRoomCode);
    setSeconds(roomData.data.timeLimit);
  };

  useEffect(() => {
    getRoomInfo();
  }, []);

  return {
    chartRef,
    chartData,
    options,
    maxValue,
    minValue,
    isLoading,
  };
}
