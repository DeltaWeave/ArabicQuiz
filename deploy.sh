#!/bin/bash

# 🚀 Arabic Quiz App - Vercel Deployment Script
# This script helps you deploy your app to Vercel

echo "🎯 Arabic Quiz App - Vercel Deployment"
echo "======================================="
echo ""

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from your project directory."
    exit 1
fi

echo "✅ Found project files"
echo ""

# Step 1: Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Step 1: Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi
echo ""

# Step 2: Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore file..."
    cat > .gitignore << 'EOF'
node_modules/
.expo/
.expo-shared/
web-build/
.vercel
.DS_Store
npm-debug.log*
EOF
    echo "✅ .gitignore created"
else
    echo "✅ .gitignore exists"
fi
echo ""

# Step 3: Add Vercel configuration
if [ ! -f "vercel.json" ]; then
    echo "⚙️  Creating vercel.json configuration..."
    cat > vercel.json << 'EOF'
{
  "name": "arabic-quiz-app",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "web-build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
EOF
    echo "✅ vercel.json created"
else
    echo "✅ vercel.json exists"
fi
echo ""

# Step 4: Update package.json with build script
echo "📝 Checking build script in package.json..."
if grep -q '"build":' package.json; then
    echo "✅ Build script exists"
else
    echo "⚠️  Adding build script to package.json..."
    echo "   Please manually add: \"build\": \"expo export:web\" to scripts"
fi
echo ""

# Step 5: Add all files to git
echo "📦 Step 2: Adding files to Git..."
git add .
echo "✅ Files added"
echo ""

# Step 6: Commit
echo "💾 Step 3: Creating commit..."
git commit -m "Initial commit: Arabic Quiz App with 294 questions" 2>/dev/null || echo "✅ Already committed or no changes"
echo ""

# Step 7: Instructions for GitHub
echo "🌐 Step 4: Push to GitHub"
echo "=========================="
echo ""
echo "Go to https://github.com and create a new repository named: arabic-quiz-app"
echo ""
echo "Then run these commands:"
echo ""
echo "  git remote add origin https://github.com/YOUR_USERNAME/arabic-quiz-app.git"
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""
read -p "Press Enter after you've pushed to GitHub..."
echo ""

# Step 8: Vercel deployment instructions
echo "🚀 Step 5: Deploy to Vercel"
echo "==========================="
echo ""
echo "Option A - Via Website (Recommended):"
echo "  1. Go to https://vercel.com"
echo "  2. Sign up/Login with GitHub"
echo "  3. Click 'New Project'"
echo "  4. Import 'arabic-quiz-app' repository"
echo "  5. Click 'Deploy'"
echo "  6. Wait 2-3 minutes"
echo "  7. Done! 🎉"
echo ""
echo "Option B - Via CLI:"
echo "  npm install -g vercel"
echo "  vercel login"
echo "  vercel --prod"
echo ""
echo "✅ Setup complete! Follow the instructions above to deploy."
echo ""
echo "📱 Your app will be live at: https://arabic-quiz-app.vercel.app"
echo ""
