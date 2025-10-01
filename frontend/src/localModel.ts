/**
 * Local Financial Model Engine
 * Client-side implementation of the financial calculations
 * Used when the backend API is unavailable
 */

import { ModelInputs, ModelResults } from './types';

export class LocalFinancialModel {
  private scenarios = {
    "base": {
      "InitialUsers": 1000,
      "MonthlyGrowthRate": 15.0,
      "ChurnRate": 5.0,
      "CAC": 50.0,
      "ARPU_Free": 0.0,
      "ARPU_Premium": 7.0,
      "ARPU_StablecoinYield": 2.5,
      "ARPU_AssetFee": 3.0,
      "ARPU_API": 1.5,
      "PremiumConversionRate": 20.0,
      "AvgTransactionVolume": 500.0,
      "AverageLifetimeMonths": 24.0,
      "FixedCosts_Payroll": 50000.0,
      "FixedCosts_RnD": 30000.0,
      "FixedCosts_Operations": 20000.0,
      "VariableCost_KYC": 5.0,
      "VariableCost_Infrastructure": 0.5,
      "ProjectionMonths": 36
    },
    "best": {
      "InitialUsers": 1500,
      "MonthlyGrowthRate": 25.0,
      "ChurnRate": 3.0,
      "CAC": 40.0,
      "ARPU_Free": 0.0,
      "ARPU_Premium": 10.0,
      "ARPU_StablecoinYield": 4.0,
      "ARPU_AssetFee": 5.0,
      "ARPU_API": 2.5,
      "PremiumConversionRate": 30.0,
      "AvgTransactionVolume": 750.0,
      "AverageLifetimeMonths": 36.0,
      "FixedCosts_Payroll": 50000.0,
      "FixedCosts_RnD": 30000.0,
      "FixedCosts_Operations": 20000.0,
      "VariableCost_KYC": 4.0,
      "VariableCost_Infrastructure": 0.4,
      "ProjectionMonths": 36
    },
    "worst": {
      "InitialUsers": 500,
      "MonthlyGrowthRate": 8.0,
      "ChurnRate": 8.0,
      "CAC": 70.0,
      "ARPU_Free": 0.0,
      "ARPU_Premium": 5.0,
      "ARPU_StablecoinYield": 1.5,
      "ARPU_AssetFee": 2.0,
      "ARPU_API": 1.0,
      "PremiumConversionRate": 12.0,
      "AvgTransactionVolume": 300.0,
      "AverageLifetimeMonths": 18.0,
      "FixedCosts_Payroll": 50000.0,
      "FixedCosts_RnD": 30000.0,
      "FixedCosts_Operations": 20000.0,
      "VariableCost_KYC": 6.0,
      "VariableCost_Infrastructure": 0.6,
      "ProjectionMonths": 36
    }
  };

  getScenarios() {
    return this.scenarios;
  }

  calculate(inputs: ModelInputs): ModelResults {
    const months = inputs.ProjectionMonths;
    
    // Initialize monthly data arrays
    const monthly_data = {
      'Month': Array.from({ length: months }, (_, i) => i + 1),
      'TotalUsers': [] as number[],
      'ActiveUsers': [] as number[],
      'NewUsers': [] as number[],
      'ChurnedUsers': [] as number[],
      'PremiumUsers': [] as number[],
      'FreeUsers': [] as number[],
      'Revenue_Premium': [] as number[],
      'Revenue_Stablecoin': [] as number[],
      'Revenue_AssetFee': [] as number[],
      'Revenue_API': [] as number[],
      'TotalRevenue': [] as number[],
      'CAC_Cost': [] as number[],
      'KYC_Cost': [] as number[],
      'Infrastructure_Cost': [] as number[],
      'TotalVariableCosts': [] as number[],
      'FixedCosts': [] as number[],
      'TotalCosts': [] as number[],
      'GrossProfit': [] as number[],
      'GrossMargin': [] as number[],
      'EBITDA': [] as number[],
      'NetMargin': [] as number[],
    };
    
    // Starting values
    let current_users = inputs.InitialUsers;
    
    for (let month = 1; month <= months; month++) {
      // User Growth Calculation
      let new_users: number;
      let churned_users: number;
      let active_users: number;
      
      if (month === 1) {
        new_users = 0;
        churned_users = 0;
        active_users = current_users;
      } else {
        // New user acquisition
        new_users = Math.floor(current_users * (inputs.MonthlyGrowthRate / 100));
        // Churn
        churned_users = Math.floor(current_users * (inputs.ChurnRate / 100));
        // Net users
        current_users = current_users + new_users - churned_users;
        active_users = current_users;
      }
      
      // Premium vs Free split
      const premium_users = Math.floor(active_users * (inputs.PremiumConversionRate / 100));
      const free_users = active_users - premium_users;
      
      // Revenue Calculations
      const revenue_premium = premium_users * inputs.ARPU_Premium;
      const revenue_stablecoin = premium_users * inputs.ARPU_StablecoinYield;
      const revenue_asset_fee = premium_users * inputs.ARPU_AssetFee;
      const revenue_api = premium_users * inputs.ARPU_API;
      const total_revenue = revenue_premium + revenue_stablecoin + revenue_asset_fee + revenue_api;
      
      // Cost Calculations
      const cac_cost = new_users * inputs.CAC;
      const kyc_cost = new_users * inputs.VariableCost_KYC;
      const infrastructure_cost = active_users * inputs.VariableCost_Infrastructure;
      const total_variable_costs = cac_cost + kyc_cost + infrastructure_cost;
      
      const fixed_costs = (inputs.FixedCosts_Payroll + 
                          inputs.FixedCosts_RnD + 
                          inputs.FixedCosts_Operations);
      
      const total_costs = total_variable_costs + fixed_costs;
      
      // Profitability Metrics
      const gross_profit = total_revenue - total_variable_costs;
      const gross_margin = total_revenue > 0 ? (gross_profit / total_revenue * 100) : 0;
      const ebitda = total_revenue - total_costs;
      const net_margin = total_revenue > 0 ? (ebitda / total_revenue * 100) : 0;
      
      // Append to monthly data
      monthly_data.TotalUsers.push(Math.floor(current_users));
      monthly_data.ActiveUsers.push(Math.floor(active_users));
      monthly_data.NewUsers.push(Math.floor(new_users));
      monthly_data.ChurnedUsers.push(Math.floor(churned_users));
      monthly_data.PremiumUsers.push(Math.floor(premium_users));
      monthly_data.FreeUsers.push(Math.floor(free_users));
      monthly_data.Revenue_Premium.push(Math.round(revenue_premium * 100) / 100);
      monthly_data.Revenue_Stablecoin.push(Math.round(revenue_stablecoin * 100) / 100);
      monthly_data.Revenue_AssetFee.push(Math.round(revenue_asset_fee * 100) / 100);
      monthly_data.Revenue_API.push(Math.round(revenue_api * 100) / 100);
      monthly_data.TotalRevenue.push(Math.round(total_revenue * 100) / 100);
      monthly_data.CAC_Cost.push(Math.round(cac_cost * 100) / 100);
      monthly_data.KYC_Cost.push(Math.round(kyc_cost * 100) / 100);
      monthly_data.Infrastructure_Cost.push(Math.round(infrastructure_cost * 100) / 100);
      monthly_data.TotalVariableCosts.push(Math.round(total_variable_costs * 100) / 100);
      monthly_data.FixedCosts.push(Math.round(fixed_costs * 100) / 100);
      monthly_data.TotalCosts.push(Math.round(total_costs * 100) / 100);
      monthly_data.GrossProfit.push(Math.round(gross_profit * 100) / 100);
      monthly_data.GrossMargin.push(Math.round(gross_margin * 100) / 100);
      monthly_data.EBITDA.push(Math.round(ebitda * 100) / 100);
      monthly_data.NetMargin.push(Math.round(net_margin * 100) / 100);
    }
    
    // Calculate Key VC Metrics
    const total_arpu = (inputs.ARPU_Premium + inputs.ARPU_StablecoinYield + 
                      inputs.ARPU_AssetFee + inputs.ARPU_API);
    
    const ltv = total_arpu * inputs.AverageLifetimeMonths;
    const ltv_cac_ratio = inputs.CAC > 0 ? ltv / inputs.CAC : 0;
    
    // Summary metrics
    const summary = {
      'LTV': Math.round(ltv * 100) / 100,
      'CAC': inputs.CAC,
      'LTV_CAC_Ratio': Math.round(ltv_cac_ratio * 100) / 100,
      'Total_ARPU': Math.round(total_arpu * 100) / 100,
      'ChurnRate': inputs.ChurnRate,
      'AverageLifetimeMonths': inputs.AverageLifetimeMonths,
      'Year1_Revenue': Math.round(monthly_data.TotalRevenue.slice(0, 12).reduce((a, b) => a + b, 0) * 100) / 100,
      'Year1_EBITDA': Math.round(monthly_data.EBITDA.slice(0, 12).reduce((a, b) => a + b, 0) * 100) / 100,
      'Year2_Revenue': months >= 24 ? Math.round(monthly_data.TotalRevenue.slice(12, 24).reduce((a, b) => a + b, 0) * 100) / 100 : 0,
      'Year2_EBITDA': months >= 24 ? Math.round(monthly_data.EBITDA.slice(12, 24).reduce((a, b) => a + b, 0) * 100) / 100 : 0,
      'Year3_Revenue': months >= 36 ? Math.round(monthly_data.TotalRevenue.slice(24, 36).reduce((a, b) => a + b, 0) * 100) / 100 : 0,
      'Year3_EBITDA': months >= 36 ? Math.round(monthly_data.EBITDA.slice(24, 36).reduce((a, b) => a + b, 0) * 100) / 100 : 0,
      'Final_Month_Users': monthly_data.TotalUsers[monthly_data.TotalUsers.length - 1],
      'Final_Month_Revenue': monthly_data.TotalRevenue[monthly_data.TotalRevenue.length - 1],
      'Avg_Gross_Margin': Math.round(monthly_data.GrossMargin.reduce((a, b) => a + b, 0) / monthly_data.GrossMargin.length * 100) / 100,
      'Avg_Net_Margin': Math.round(monthly_data.NetMargin.reduce((a, b) => a + b, 0) / monthly_data.NetMargin.length * 100) / 100,
    };
    
    return {
      monthly_data,
      summary,
      inputs
    };
  }
}

// Create a singleton instance
const localModel = new LocalFinancialModel();

export default localModel;
