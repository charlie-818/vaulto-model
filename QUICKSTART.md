# 🚀 Quick Start Guide

Get Vaulto Financial Model Dashboard running in 5 minutes!

## Prerequisites

- Python 3.9+ installed
- Node.js 16+ installed
- Terminal/Command prompt

## Quick Setup

### 1️⃣ Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

✅ Backend running at `http://localhost:8000`

### 2️⃣ Frontend Setup (2 minutes)

Open a **new terminal window**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the app
npm start
```

✅ Frontend opens automatically at `http://localhost:3000`

## 🎉 That's It!

Your financial model dashboard is now running! 

### What to Try:

1. **Adjust sliders** in the Control Panel
2. **Switch scenarios** using top navbar buttons (Best/Base/Worst)
3. **Watch charts update** in real-time
4. **Export data** using CSV or JSON buttons

## 📱 First Time Using?

### Explore the Control Panel
- **User Growth**: Adjust initial users, growth rate, churn
- **Revenue Drivers**: Set ARPU for different products
- **Cost Structure**: Configure fixed and variable costs

### Key Metrics to Watch
- **LTV/CAC Ratio**: Should be 3:1 or higher (good unit economics)
- **Year 1 Revenue**: First year revenue projection
- **Gross Margin**: Target 70%+ for SaaS

### Charts Overview
1. **Revenue by Product**: See which revenue streams contribute most
2. **User Growth**: Track total and premium user growth
3. **LTV vs CAC**: Validate unit economics
4. **Profitability**: Monitor path to positive EBITDA
5. **Churn & Retention**: Track customer retention

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Try reinstalling dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend shows connection error?
- Ensure backend is running on port 8000
- Check `http://localhost:8000` in your browser
- You should see: `{"message": "Vaulto Financial Model API"}`

### Port already in use?
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill  # macOS/Linux
# or change port in backend/main.py
```

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize scenarios in `backend/model_engine.py`

## 💡 Pro Tips

1. **Save Scenarios**: Take screenshots of different configurations
2. **Export Data**: Download CSV for Excel analysis
3. **Presentation Mode**: Use fullscreen (F11) for demos
4. **Mobile Responsive**: Works on tablets and phones too!

---

Questions? Check the main [README.md](README.md) or open an issue on GitHub.



