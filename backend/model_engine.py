"""
Vaulto Financial Model Engine
Handles all financial calculations and projections
"""
import pandas as pd
import numpy as np
from typing import Dict, List


class FinancialModel:
    def __init__(self):
        self.scenarios = self._define_scenarios()
    
    def _define_scenarios(self) -> Dict:
        """Define preset scenarios for quick testing"""
        return {
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
        }
    
    def get_scenarios(self) -> Dict:
        """Return all predefined scenarios"""
        return self.scenarios
    
    def calculate(self, inputs: Dict) -> Dict:
        """
        Main calculation engine
        Returns comprehensive financial projections
        """
        months = inputs['ProjectionMonths']
        
        # Initialize monthly data arrays
        monthly_data = {
            'Month': list(range(1, months + 1)),
            'TotalUsers': [],
            'ActiveUsers': [],
            'NewUsers': [],
            'ChurnedUsers': [],
            'PremiumUsers': [],
            'FreeUsers': [],
            'Revenue_Premium': [],
            'Revenue_Stablecoin': [],
            'Revenue_AssetFee': [],
            'Revenue_API': [],
            'TotalRevenue': [],
            'CAC_Cost': [],
            'KYC_Cost': [],
            'Infrastructure_Cost': [],
            'TotalVariableCosts': [],
            'FixedCosts': [],
            'TotalCosts': [],
            'GrossProfit': [],
            'GrossMargin': [],
            'EBITDA': [],
            'NetMargin': [],
        }
        
        # Starting values
        current_users = inputs['InitialUsers']
        
        for month in range(1, months + 1):
            # User Growth Calculation
            if month == 1:
                new_users = 0
                churned_users = 0
                active_users = current_users
            else:
                # New user acquisition
                new_users = int(current_users * (inputs['MonthlyGrowthRate'] / 100))
                # Churn
                churned_users = int(current_users * (inputs['ChurnRate'] / 100))
                # Net users
                current_users = current_users + new_users - churned_users
                active_users = current_users
            
            # Premium vs Free split
            premium_users = int(active_users * (inputs['PremiumConversionRate'] / 100))
            free_users = active_users - premium_users
            
            # Revenue Calculations
            revenue_premium = premium_users * inputs['ARPU_Premium']
            revenue_stablecoin = premium_users * inputs['ARPU_StablecoinYield']
            revenue_asset_fee = premium_users * inputs['ARPU_AssetFee']
            revenue_api = premium_users * inputs['ARPU_API']
            total_revenue = revenue_premium + revenue_stablecoin + revenue_asset_fee + revenue_api
            
            # Cost Calculations
            cac_cost = new_users * inputs['CAC']
            kyc_cost = new_users * inputs['VariableCost_KYC']
            infrastructure_cost = active_users * inputs['VariableCost_Infrastructure']
            total_variable_costs = cac_cost + kyc_cost + infrastructure_cost
            
            fixed_costs = (inputs['FixedCosts_Payroll'] + 
                          inputs['FixedCosts_RnD'] + 
                          inputs['FixedCosts_Operations'])
            
            total_costs = total_variable_costs + fixed_costs
            
            # Profitability Metrics
            gross_profit = total_revenue - total_variable_costs
            gross_margin = (gross_profit / total_revenue * 100) if total_revenue > 0 else 0
            ebitda = total_revenue - total_costs
            net_margin = (ebitda / total_revenue * 100) if total_revenue > 0 else 0
            
            # Append to monthly data
            monthly_data['TotalUsers'].append(int(current_users))
            monthly_data['ActiveUsers'].append(int(active_users))
            monthly_data['NewUsers'].append(int(new_users))
            monthly_data['ChurnedUsers'].append(int(churned_users))
            monthly_data['PremiumUsers'].append(int(premium_users))
            monthly_data['FreeUsers'].append(int(free_users))
            monthly_data['Revenue_Premium'].append(round(revenue_premium, 2))
            monthly_data['Revenue_Stablecoin'].append(round(revenue_stablecoin, 2))
            monthly_data['Revenue_AssetFee'].append(round(revenue_asset_fee, 2))
            monthly_data['Revenue_API'].append(round(revenue_api, 2))
            monthly_data['TotalRevenue'].append(round(total_revenue, 2))
            monthly_data['CAC_Cost'].append(round(cac_cost, 2))
            monthly_data['KYC_Cost'].append(round(kyc_cost, 2))
            monthly_data['Infrastructure_Cost'].append(round(infrastructure_cost, 2))
            monthly_data['TotalVariableCosts'].append(round(total_variable_costs, 2))
            monthly_data['FixedCosts'].append(round(fixed_costs, 2))
            monthly_data['TotalCosts'].append(round(total_costs, 2))
            monthly_data['GrossProfit'].append(round(gross_profit, 2))
            monthly_data['GrossMargin'].append(round(gross_margin, 2))
            monthly_data['EBITDA'].append(round(ebitda, 2))
            monthly_data['NetMargin'].append(round(net_margin, 2))
        
        # Calculate Key VC Metrics
        total_arpu = (inputs['ARPU_Premium'] + inputs['ARPU_StablecoinYield'] + 
                      inputs['ARPU_AssetFee'] + inputs['ARPU_API'])
        
        ltv = total_arpu * inputs['AverageLifetimeMonths']
        ltv_cac_ratio = ltv / inputs['CAC'] if inputs['CAC'] > 0 else 0
        
        # Summary metrics
        summary = {
            'LTV': round(ltv, 2),
            'CAC': inputs['CAC'],
            'LTV_CAC_Ratio': round(ltv_cac_ratio, 2),
            'Total_ARPU': round(total_arpu, 2),
            'ChurnRate': inputs['ChurnRate'],
            'AverageLifetimeMonths': inputs['AverageLifetimeMonths'],
            'Year1_Revenue': round(sum(monthly_data['TotalRevenue'][:12]), 2),
            'Year1_EBITDA': round(sum(monthly_data['EBITDA'][:12]), 2),
            'Year2_Revenue': round(sum(monthly_data['TotalRevenue'][12:24]), 2) if months >= 24 else 0,
            'Year2_EBITDA': round(sum(monthly_data['EBITDA'][12:24]), 2) if months >= 24 else 0,
            'Year3_Revenue': round(sum(monthly_data['TotalRevenue'][24:36]), 2) if months >= 36 else 0,
            'Year3_EBITDA': round(sum(monthly_data['EBITDA'][24:36]), 2) if months >= 36 else 0,
            'Final_Month_Users': monthly_data['TotalUsers'][-1],
            'Final_Month_Revenue': monthly_data['TotalRevenue'][-1],
            'Avg_Gross_Margin': round(np.mean(monthly_data['GrossMargin']), 2),
            'Avg_Net_Margin': round(np.mean(monthly_data['NetMargin']), 2),
        }
        
        return {
            'monthly_data': monthly_data,
            'summary': summary,
            'inputs': inputs
        }



