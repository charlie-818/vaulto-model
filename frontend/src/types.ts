export interface ModelInputs {
  InitialUsers: number;
  MonthlyGrowthRate: number;
  ChurnRate: number;
  CAC: number;
  ARPU_Free: number;
  ARPU_Premium: number;
  ARPU_StablecoinYield: number;
  ARPU_AssetFee: number;
  ARPU_API: number;
  PremiumConversionRate: number;
  AvgTransactionVolume: number;
  AverageLifetimeMonths: number;
  FixedCosts_Payroll: number;
  FixedCosts_RnD: number;
  FixedCosts_Operations: number;
  VariableCost_KYC: number;
  VariableCost_Infrastructure: number;
  ProjectionMonths: number;
}

export interface MonthlyData {
  Month: number[];
  TotalUsers: number[];
  ActiveUsers: number[];
  NewUsers: number[];
  ChurnedUsers: number[];
  PremiumUsers: number[];
  FreeUsers: number[];
  Revenue_Premium: number[];
  Revenue_Stablecoin: number[];
  Revenue_AssetFee: number[];
  Revenue_API: number[];
  TotalRevenue: number[];
  CAC_Cost: number[];
  KYC_Cost: number[];
  Infrastructure_Cost: number[];
  TotalVariableCosts: number[];
  FixedCosts: number[];
  TotalCosts: number[];
  GrossProfit: number[];
  GrossMargin: number[];
  EBITDA: number[];
  NetMargin: number[];
}

export interface Summary {
  LTV: number;
  CAC: number;
  LTV_CAC_Ratio: number;
  Total_ARPU: number;
  ChurnRate: number;
  AverageLifetimeMonths: number;
  Year1_Revenue: number;
  Year1_EBITDA: number;
  Year2_Revenue: number;
  Year2_EBITDA: number;
  Year3_Revenue: number;
  Year3_EBITDA: number;
  Final_Month_Users: number;
  Final_Month_Revenue: number;
  Avg_Gross_Margin: number;
  Avg_Net_Margin: number;
}

export interface ModelResults {
  monthly_data: MonthlyData;
  summary: Summary;
  inputs: ModelInputs;
}



