#!/bin/bash

echo "=================================================="
echo "   🚀 Welcome to ArtGenesis Setup & Start Script!"
echo "=================================================="
echo ""

echo "📦 Installing dependencies..."
npm install

echo ""
echo "⚙️  Checking environment variables..."

if [ ! -f "apps/api/.env" ]; then
  if [ -f "apps/api/.env.example" ]; then
    echo "Creating .env for API..."
    cp apps/api/.env.example apps/api/.env
  fi
fi

if [ ! -f "apps/web/.env" ]; then
  if [ -f "apps/web/.env.example" ]; then
    echo "Creating .env for Web..."
    cp apps/web/.env.example apps/web/.env
  fi
fi

echo ""
echo "✨ Setup complete! Starting the application stack (Next.js + NestJS)..."
echo "You can access the frontend at http://localhost:3000"
echo ""

npm run dev
