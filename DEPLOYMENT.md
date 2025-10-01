# 🚀 Deployment Guide

This guide covers deploying Vaulto Financial Model Dashboard to production with HTTPS.

## 📋 Prerequisites

- GitHub account
- Vercel/Netlify account (for frontend)
- Heroku/Railway account (for backend)

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**:
   ```bash
   brew install heroku/brew/heroku  # macOS
   ```

2. **Login and Create App**:
   ```bash
   heroku login
   heroku create vaulto-model-api
   ```

3. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set CORS_ORIGINS=https://your-frontend-domain.com
   ```

5. **Your API URL**: `https://vaulto-model-api.herokuapp.com`

### Option 2: Railway

1. **Connect GitHub Repo**: Visit railway.app and connect your repository

2. **Configure Service**:
   - Root Directory: `/backend`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Set Environment Variables** in Railway dashboard:
   ```
   CORS_ORIGINS=https://your-frontend-domain.com
   ```

4. **Railway Auto-Generates HTTPS URL**: e.g., `https://vaulto-model.railway.app`

### Option 3: Google Cloud Run

1. **Install gcloud CLI**

2. **Build and Deploy**:
   ```bash
   cd backend
   gcloud run deploy vaulto-api \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variable**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.com`

4. **Redeploy**: `vercel --prod`

5. **Custom Domain** (Optional):
   - Go to Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed
   - HTTPS is automatic

### Option 2: Netlify

1. **Connect GitHub Repository**:
   - Go to netlify.com
   - Click "New site from Git"
   - Select your repository

2. **Configure Build**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

3. **Environment Variables**:
   - Go to Site settings → Build & deploy → Environment
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.com`

4. **Custom Domain**:
   - Go to Domain settings
   - Add custom domain
   - HTTPS is automatic

## Complete Deployment Workflow

### Step 1: Deploy Backend First

```bash
# Using Railway (easiest)
1. Push code to GitHub
2. Connect repo to Railway
3. Set root directory to /backend
4. Note the generated URL: https://your-api.railway.app
```

### Step 2: Deploy Frontend

```bash
# Using Vercel
cd frontend
vercel

# When prompted, set environment:
# REACT_APP_API_URL = https://your-api.railway.app
```

### Step 3: Update CORS

Update your backend's CORS origins to include your frontend URL:

```python
# In backend/main.py or via environment variable
CORS_ORIGINS = "https://your-frontend.vercel.app"
```

### Step 4: Test Production

1. Visit your frontend URL
2. Check browser console for errors
3. Test all features:
   - Scenario switching
   - Input changes
   - Chart rendering
   - CSV/JSON export

## Environment Variables Summary

### Backend (.env)
```env
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=https://your-frontend-domain.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## HTTPS Configuration

Both Vercel and Netlify provide:
- ✅ Automatic HTTPS certificates
- ✅ Certificate renewal
- ✅ HTTP → HTTPS redirect
- ✅ Custom domain support

No additional configuration needed!

## Custom Domain Setup

### Frontend (Vercel)
```bash
vercel domains add your-domain.com
# Follow DNS instructions
```

### Backend (Railway)
- Go to Settings → Networking
- Add custom domain
- Configure DNS as instructed

## Monitoring & Logs

### Vercel
```bash
vercel logs
# Or visit: https://vercel.com/your-project/logs
```

### Railway
- Visit Railway dashboard
- Click on your service
- View "Deployments" tab for logs

### Heroku
```bash
heroku logs --tail
```

## Performance Optimization

### Frontend
1. **Enable Compression**: Vercel/Netlify do this automatically
2. **CDN**: Automatically provided
3. **Caching**: Configure headers in `vercel.json` or `netlify.toml`

### Backend
1. **Response Caching**: Add caching headers for static calculations
2. **Connection Pooling**: If using a database
3. **Rate Limiting**: Implement to prevent abuse

## Security Checklist

- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS configured to allow only your frontend domain
- [ ] Environment variables set (not hardcoded)
- [ ] API rate limiting implemented (optional)
- [ ] No sensitive data in client code
- [ ] Content Security Policy headers (optional)

## Troubleshooting

### CORS Errors
- Ensure backend `CORS_ORIGINS` includes your frontend domain
- Check for trailing slashes
- Verify HTTPS is used consistently

### API Connection Failed
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is running: visit `/health` endpoint
- Verify CORS configuration

### Build Failures
- Check Node/Python versions match requirements
- Verify all dependencies are in package.json/requirements.txt
- Check build logs for specific errors

## Continuous Deployment

Both Vercel and Railway/Heroku support automatic deployments:

1. **Push to GitHub**
2. **Automatic Build Triggered**
3. **Tests Run** (if configured)
4. **Deploy to Production**

Configure branch protection and deployment branches in your hosting dashboard.

## Cost Estimates

### Free Tier Options
- **Vercel**: Free for personal projects
- **Netlify**: 100GB bandwidth/month free
- **Railway**: $5 free credit/month
- **Heroku**: Free tier deprecated, starts at $7/month

### Recommended for Production
- **Frontend**: Vercel Pro ($20/month) or Netlify Pro ($19/month)
- **Backend**: Railway ($5-20/month) or Heroku Eco ($5/month)

## Next Steps

After deployment:

1. ✅ Test all functionality
2. ✅ Set up monitoring (optional)
3. ✅ Configure custom domain (optional)
4. ✅ Add analytics (optional)
5. ✅ Share with stakeholders!

---

Need help? Open an issue on GitHub or contact support.



