# Vaulto Financial Model - Backend API

FastAPI-based backend for the Vaulto Financial Model Dashboard.

## Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Key Files

- `main.py`: FastAPI application and API endpoints
- `model_engine.py`: Financial calculation engine
- `requirements.txt`: Python dependencies

## Environment Variables

Create a `.env` file:

```env
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000
```



