#!/bin/bash

# Vaulto Model Frontend Build Script
echo "🚀 Starting Vaulto Model frontend build..."

# Set environment variables
export CI=false
export NODE_ENV=production

# Clean previous build and cache
echo "🧹 Cleaning previous build and cache..."
rm -rf build
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build successful!"
    echo "📁 Build directory created with $(du -sh build | cut -f1) of files"
    echo "🌐 Ready for deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi
