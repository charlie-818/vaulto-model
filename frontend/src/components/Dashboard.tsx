import React from 'react';
import './Dashboard.css';
import { ModelResults } from '../types';
import MetricCard from './MetricCard';
import RevenueChart from './charts/RevenueChart';
import UserGrowthChart from './charts/UserGrowthChart';
import LTVCACChart from './charts/LTVCACChart';
import ProfitabilityChart from './charts/ProfitabilityChart';
import ChurnChart from './charts/ChurnChart';

interface DashboardProps {
  results: ModelResults | null;
  loading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Calculating financial projections...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="dashboard">
        <div className="empty-state">
          <h2>Welcome to Vaulto Financial Model</h2>
          <p>Adjust the controls to see your financial projections</p>
        </div>
      </div>
    );
  }

  const { summary } = results;

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <MetricCard
          title="LTV / CAC Ratio"
          value={summary.LTV_CAC_Ratio.toFixed(2)}
          subtitle={`LTV: $${summary.LTV.toFixed(0)} | CAC: $${summary.CAC.toFixed(0)}`}
          trend={summary.LTV_CAC_Ratio >= 3 ? 'good' : summary.LTV_CAC_Ratio >= 2 ? 'neutral' : 'bad'}
        />
        <MetricCard
          title="Year 1 Revenue"
          value={`$${(summary.Year1_Revenue / 1000).toFixed(0)}K`}
          subtitle={`EBITDA: $${(summary.Year1_EBITDA / 1000).toFixed(0)}K`}
          trend={summary.Year1_EBITDA > 0 ? 'good' : 'bad'}
        />
        <MetricCard
          title="Year 2 Revenue"
          value={`$${(summary.Year2_Revenue / 1000).toFixed(0)}K`}
          subtitle={`EBITDA: $${(summary.Year2_EBITDA / 1000).toFixed(0)}K`}
          trend={summary.Year2_EBITDA > 0 ? 'good' : 'bad'}
        />
        <MetricCard
          title="Year 3 Revenue"
          value={`$${(summary.Year3_Revenue / 1000).toFixed(0)}K`}
          subtitle={`EBITDA: $${(summary.Year3_EBITDA / 1000).toFixed(0)}K`}
          trend={summary.Year3_EBITDA > 0 ? 'good' : 'bad'}
        />
        <MetricCard
          title="Total ARPU"
          value={`$${summary.Total_ARPU.toFixed(2)}`}
          subtitle={`Lifetime: ${summary.AverageLifetimeMonths} months`}
          trend="neutral"
        />
        <MetricCard
          title="Final Month Users"
          value={summary.Final_Month_Users.toLocaleString()}
          subtitle={`Revenue: $${(summary.Final_Month_Revenue / 1000).toFixed(1)}K`}
          trend="good"
        />
        <MetricCard
          title="Avg Gross Margin"
          value={`${summary.Avg_Gross_Margin.toFixed(1)}%`}
          subtitle={`Net Margin: ${summary.Avg_Net_Margin.toFixed(1)}%`}
          trend={summary.Avg_Gross_Margin >= 70 ? 'good' : summary.Avg_Gross_Margin >= 50 ? 'neutral' : 'bad'}
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>📈 Revenue by Product (Monthly)</h3>
          <RevenueChart data={results.monthly_data} />
        </div>

        <div className="chart-card">
          <h3>👥 User Growth Over Time</h3>
          <UserGrowthChart data={results.monthly_data} />
        </div>

        <div className="chart-card">
          <h3>💰 LTV vs CAC Analysis</h3>
          <LTVCACChart summary={summary} />
        </div>

        <div className="chart-card">
          <h3>📊 Profitability Trajectory</h3>
          <ProfitabilityChart data={results.monthly_data} />
        </div>

        <div className="chart-card">
          <h3>📉 Churn & Retention</h3>
          <ChurnChart data={results.monthly_data} inputs={results.inputs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



