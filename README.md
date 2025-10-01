# 💰 Vaulto Financial Model Dashboard

A comprehensive full-stack financial modeling web application designed for real-time scenario analysis, optimized for VC fundraising and strategic planning.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Overview

Vaulto Financial Model Dashboard enables dynamic financial projections through an intuitive control panel interface. Adjust key assumptions in real-time and immediately see the impact on revenue, profitability, user growth, and other critical VC metrics.

## ✨ Key Features

- **Real-Time Scenario Analysis**: Toggle between Best/Base/Worst case scenarios instantly
- **Interactive Control Panel**: Adjust 18+ key assumptions with sliders and inputs
- **Dynamic Visualizations**: 5 interactive charts powered by Chart.js
- **VC-Focused Metrics**: LTV/CAC ratio, ARPU, churn, unit economics, EBITDA
- **Export Functionality**: Download projections as CSV or JSON
- **Modern UI/UX**: Beautiful, responsive design optimized for investor presentations
- **HTTPS-Ready**: Configured for secure deployment

## 🧱 Tech Stack

### Frontend
- React 18 with TypeScript
- Chart.js 4 with react-chartjs-2
- Axios for API communication
- Modern CSS with backdrop filters

### Backend
- FastAPI (Python 3.9+)
- Pandas for financial calculations
- Uvicorn ASGI server
- CORS-enabled for cross-origin requests

### Financial Model
- Multi-stream revenue modeling
- User growth & churn calculations
- LTV/CAC analysis
- Cost structure (fixed + variable)
- 36-month projections

## 📦 Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 🚀 Usage

### Running Locally

1. **Start the Backend**:
   ```bash
   cd backend
   source venv/bin/activate
   python main.py
   ```

2. **Start the Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Dashboard**: Open `http://localhost:3000` in your browser

### Using the Dashboard

1. **Adjust Inputs**: Use the Control Panel on the left to modify assumptions
2. **Switch Scenarios**: Click Best/Base/Worst buttons in the top navbar
3. **View Metrics**: Monitor key VC metrics in the dashboard cards
4. **Analyze Charts**: Review 5 interactive charts showing different aspects
5. **Export Data**: Download projections as CSV or JSON for further analysis

## 📊 Model Components

### User Growth & Acquisition
- Initial Users
- Monthly Growth Rate (%)
- Churn Rate (%)
- Customer Acquisition Cost (CAC)

### Revenue Drivers
- ARPU - Premium Subscriptions
- ARPU - Stablecoin Yield
- ARPU - Tokenized Asset Fees
- ARPU - API/AI Services
- Premium Conversion Rate (%)

### LTV Calculation
- Average Customer Lifetime (months)
- Lifetime Value (LTV)
- LTV/CAC Ratio

### Cost Structure
- Fixed Costs: Payroll, R&D, Operations
- Variable Costs: KYC, Infrastructure per user

### Output Metrics
- Monthly Revenue by Stream
- Gross Margin & Net Margin
- EBITDA Trajectory
- User Growth Curves
- Churn & Retention Analysis

## 📈 Charts & Visualizations

1. **Revenue by Product**: Stacked bar chart showing monthly revenue streams
2. **User Growth Over Time**: Line chart tracking total and premium users
3. **LTV vs CAC Analysis**: Bar chart with ratio calculation
4. **Profitability Trajectory**: EBITDA and gross profit trends
5. **Churn & Retention**: Dual-axis chart showing churn and retention rates

## 🔧 Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000,https://your-domain.com
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

For production, update this to your deployed backend URL.

## 🌐 Deployment

### Backend Deployment (Heroku/Railway)

1. **Heroku**:
   ```bash
   cd backend
   heroku create vaulto-model-api
   git push heroku main
   ```

2. **Railway**:
   - Connect your GitHub repo
   - Set root directory to `/backend`
   - Railway will auto-detect and deploy

### Frontend Deployment (Vercel/Netlify)

1. **Vercel**:
   ```bash
   cd frontend
   vercel
   ```

2. **Netlify**:
   - Connect GitHub repo
   - Build command: `npm run build`
   - Publish directory: `build`
   - Set environment variable: `REACT_APP_API_URL`

### HTTPS Configuration

Both Vercel and Netlify provide automatic HTTPS certificates. For custom domains:

1. Add your domain in the hosting dashboard
2. Configure DNS records as instructed
3. HTTPS will be automatically provisioned

## 🔐 Security Recommendations

For production deployment:

1. **API Authentication**: Add API key authentication to backend
2. **Rate Limiting**: Implement rate limiting on API endpoints
3. **Environment Variables**: Never commit `.env` files
4. **CORS**: Restrict CORS origins to your frontend domain only
5. **Password Protection**: Consider adding basic auth for investor access

## 📝 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation powered by FastAPI's built-in Swagger UI.

### Key Endpoints

- `POST /calculate`: Calculate financial projections
- `POST /scenario`: Load predefined scenario
- `GET /scenarios`: List all scenarios
- `POST /export/csv`: Export as CSV
- `POST /export/json`: Export as JSON

## 🎨 Customization

### Adding New Metrics

1. **Backend**: Update `model_engine.py` to add calculation logic
2. **Types**: Add new fields to `frontend/src/types.ts`
3. **Display**: Create new components or update existing charts

### Modifying Scenarios

Edit the `_define_scenarios()` method in `backend/model_engine.py`:

```python
def _define_scenarios(self) -> Dict:
    return {
        "custom": {
            "InitialUsers": 2000,
            # ... your values
        }
    }
```

## 🐛 Troubleshooting

### Backend Issues

- **Port already in use**: Change `API_PORT` in `.env`
- **Module not found**: Ensure virtual environment is activated
- **CORS errors**: Check `CORS_ORIGINS` configuration

### Frontend Issues

- **API connection failed**: Verify `REACT_APP_API_URL` is correct
- **Charts not rendering**: Clear browser cache and rebuild
- **TypeScript errors**: Run `npm install` to ensure all types are installed

## 📚 Project Structure

```
vaulto-model/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── model_engine.py      # Financial model logic
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── charts/          # Chart components
│   │   ├── App.tsx          # Main app component
│   │   ├── api.ts           # API client
│   │   └── types.ts         # TypeScript types
│   └── package.json         # Node dependencies
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Use Cases

- **VC Fundraising**: Present dynamic financial models to investors
- **Strategic Planning**: Test different growth scenarios
- **Board Presentations**: Generate investor-ready reports
- **Financial Analysis**: Model unit economics and profitability
- **Scenario Testing**: Compare best/base/worst case outcomes

## 💡 Tips for VC Presentations

1. **Start with Base Case**: Show realistic projections first
2. **Demonstrate LTV/CAC**: Aim for 3:1 ratio or higher
3. **Show Path to Profitability**: Highlight when EBITDA turns positive
4. **Unit Economics**: Emphasize strong ARPU and low churn
5. **Export Charts**: Download key visualizations for pitch decks

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for Vaulto | Powered by React + FastAPI



