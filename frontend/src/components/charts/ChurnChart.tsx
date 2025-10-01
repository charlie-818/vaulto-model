import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MonthlyData, ModelInputs } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChurnChartProps {
  data: MonthlyData;
  inputs: ModelInputs;
}

const ChurnChart: React.FC<ChurnChartProps> = ({ data, inputs }) => {
  // Calculate retention rate (inverse of churn)
  const retentionRate = data.Month.map(() => 100 - inputs.ChurnRate);

  const chartData = {
    labels: data.Month.map(m => `M${m}`),
    datasets: [
      {
        label: 'Churned Users',
        data: data.ChurnedUsers,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        label: 'Retention Rate (%)',
        data: retentionRate,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        yAxisID: 'y1',
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#cbd5e1',
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (context.dataset.yAxisID === 'y1') {
              return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
            }
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 10,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 10,
          },
        },
        title: {
          display: true,
          text: 'Churned Users',
          color: '#94a3b8',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 10,
          },
          callback: function(value: any) {
            return value + '%';
          },
        },
        title: {
          display: true,
          text: 'Retention %',
          color: '#94a3b8',
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChurnChart;



