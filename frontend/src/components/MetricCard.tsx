import React from 'react';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: 'good' | 'bad' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, trend }) => {
  const trendColors = {
    good: '#10b981',
    bad: '#ef4444',
    neutral: '#60a5fa',
  };

  return (
    <div className="metric-card" style={{ borderLeftColor: trendColors[trend] }}>
      <div className="metric-title">{title}</div>
      <div className="metric-value" style={{ color: trendColors[trend] }}>
        {value}
      </div>
      <div className="metric-subtitle">{subtitle}</div>
    </div>
  );
};

export default MetricCard;



