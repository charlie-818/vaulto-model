# Vaulto Financial Model - Frontend

React + TypeScript frontend with interactive charts and real-time calculations.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Configuration

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:8000
```

For production deployment, update to your backend URL.

## Key Technologies

- React 18
- TypeScript
- Chart.js 4
- Axios
- CSS Modules

## Project Structure

```
src/
├── components/       # React components
│   ├── Navbar.tsx
│   ├── ControlPanel.tsx
│   ├── Dashboard.tsx
│   ├── MetricCard.tsx
│   └── charts/       # Chart components
├── App.tsx           # Main app
├── api.ts            # API client
├── types.ts          # TypeScript types
└── index.tsx         # Entry point
```

## Available Scripts

- `npm start`: Run development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App



