#!/bin/bash

# Vaulto Model Deployment Verification Script
echo "🔍 Verifying Vaulto Model deployment configuration..."

# Check if frontend builds successfully
echo "📦 Testing frontend build..."
cd frontend
if npm run build; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Check if backend dependencies are available
echo "🐍 Checking backend dependencies..."
cd ../backend
if python3 -c "import fastapi, uvicorn, pandas, pydantic" 2>/dev/null; then
    echo "✅ Backend dependencies available"
elif [ -f "requirements.txt" ]; then
    echo "⚠️  Backend dependencies not installed, but requirements.txt found"
    echo "   Run: pip install -r requirements.txt"
else
    echo "❌ Backend dependencies missing"
    exit 1
fi

# Check Netlify configuration
echo "🌐 Checking Netlify configuration..."
cd ..
if [ -f "netlify.toml" ]; then
    echo "✅ Netlify configuration found"
else
    echo "❌ Netlify configuration missing"
    exit 1
fi

# Check Git repository
echo "📁 Checking Git repository..."
if [ -d ".git" ]; then
    echo "✅ Git repository initialized"
    echo "📍 Repository URL: $(git remote get-url origin 2>/dev/null || echo 'No remote configured')"
else
    echo "❌ Git repository not initialized"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Your Vaulto Model is ready for deployment."
echo ""
echo "📋 Next steps:"
echo "1. Deploy backend to Heroku/Railway"
echo "2. Update REACT_APP_API_URL in netlify.toml with your backend URL"
echo "3. Deploy frontend to Netlify"
echo "4. Test the deployed application"
echo ""
echo "🔗 GitHub Repository: https://github.com/charlie-818/vaulto-model"
