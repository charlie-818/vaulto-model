from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel
from typing import Dict, List, Optional
import pandas as pd
from datetime import datetime
import json
import io

from model_engine import FinancialModel

app = FastAPI(title="Vaulto Financial Model API")

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
model = FinancialModel()


class ModelInputs(BaseModel):
    InitialUsers: int = 1000
    MonthlyGrowthRate: float = 15.0
    ChurnRate: float = 5.0
    CAC: float = 50.0
    ARPU_Free: float = 0.0
    ARPU_Premium: float = 7.0
    ARPU_StablecoinYield: float = 2.5
    ARPU_AssetFee: float = 3.0
    ARPU_API: float = 1.5
    PremiumConversionRate: float = 20.0
    AvgTransactionVolume: float = 500.0
    AverageLifetimeMonths: float = 24.0
    FixedCosts_Payroll: float = 50000.0
    FixedCosts_RnD: float = 30000.0
    FixedCosts_Operations: float = 20000.0
    VariableCost_KYC: float = 5.0
    VariableCost_Infrastructure: float = 0.5
    ProjectionMonths: int = 36


class ScenarioRequest(BaseModel):
    scenario: str = "base"  # base, best, worst


@app.get("/")
def read_root():
    return {"message": "Vaulto Financial Model API", "version": "1.0.0"}


@app.post("/calculate")
def calculate_model(inputs: ModelInputs):
    """Calculate financial projections based on inputs"""
    try:
        results = model.calculate(inputs.dict())
        return {"success": True, "data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/scenario")
def get_scenario(request: ScenarioRequest):
    """Get predefined scenario inputs"""
    scenarios = model.get_scenarios()
    if request.scenario not in scenarios:
        raise HTTPException(status_code=404, detail="Scenario not found")
    return {"success": True, "data": scenarios[request.scenario]}


@app.get("/scenarios")
def list_scenarios():
    """List all available scenarios"""
    scenarios = model.get_scenarios()
    return {"success": True, "scenarios": list(scenarios.keys())}


@app.post("/export/csv")
def export_csv(inputs: ModelInputs):
    """Export model results as CSV"""
    try:
        results = model.calculate(inputs.dict())
        
        # Create DataFrame from results
        df = pd.DataFrame(results['monthly_data'])
        
        # Convert to CSV
        csv_buffer = io.StringIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        
        return StreamingResponse(
            io.BytesIO(csv_buffer.getvalue().encode()),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=vaulto_model.csv"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/export/json")
def export_json(inputs: ModelInputs):
    """Export model results as JSON"""
    try:
        results = model.calculate(inputs.dict())
        
        json_str = json.dumps(results, indent=2)
        
        return StreamingResponse(
            io.BytesIO(json_str.encode()),
            media_type="application/json",
            headers={"Content-Disposition": "attachment; filename=vaulto_model.json"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



