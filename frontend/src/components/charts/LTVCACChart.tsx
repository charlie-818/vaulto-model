import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Summary } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LTVCACChartProps {
  summary: Summary;
}

const LTVCACChart: React.FC<LTVCACChartProps> = ({ summary }) => {
  const chartData = {
    labels: ['LTV', 'CAC'],
    datasets: [
      {
        label: 'Value ($)',
        data: [summary.LTV, summary.CAC],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
      title: {
        display: true,
        text: `LTV/CAC Ratio: ${summary.LTV_CAC_Ratio.toFixed(2)}x ${summary.LTV_CAC_Ratio >= 3 ? '✅' : summary.LTV_CAC_Ratio >= 2 ? '⚠️' : '❌'}`,
        color: '#cbd5e1',
        font: {
          size: 14,
          weight: 'bold' as const,
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
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 10,
          },
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LTVCACChart;



