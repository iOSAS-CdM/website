#!/bin/bash
# =====================================================================
# Universal Deployment Script with Pre-rendering Support
# Author: Daniel John Baynosa
# =====================================================================

set -e
set -o pipefail

# ─────────────────────────────
# CONFIGURATION
# ─────────────────────────────
IOSAS_REPO="/root/website"
JDMON_REPO="/root/jd-website"
DONYA_REPO="/root/donya-website"

IOSAS_DIST="/var/www/iosas.online/website/dist"
JDMON_DIST="/var/www/jdmontañez.com/jd-website/dist"
DONYA_DIST="/var/www/donyajuana.com/donya-website/dist"

NOW=$(date '+%Y-%m-%d %H:%M:%S')

FORCE_CLEAN=false
USE_PRERENDER=false

# Parse arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --clean)
      FORCE_CLEAN=true
      echo "🧹 Clean install mode enabled"
      ;;
    --prerender)
      USE_PRERENDER=true
      echo "🎨 Pre-rendering mode enabled for IO-SAS"
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--clean] [--prerender]"
      exit 1
      ;;
  esac
  shift
done

# ─────────────────────────────
# Helper Function
# ─────────────────────────────
deploy_project() {
  local NAME=$1
  local SRC=$2
  local DEST=$3
  local USE_PRERENDER_BUILD=$4

  echo ""
  echo "─────────────────────────────"
  echo "🚀 Deploying $NAME — $NOW"
  echo "─────────────────────────────"

  cd "$SRC" || { echo "❌ Source not found: $SRC"; exit 1; }

  if [ -d ".git" ]; then
    echo "📦 Pulling latest code from Git..."
    git fetch
    git reset --hard || true
    git pull
  else
    echo "⚠  No Git repo found in $SRC (skipping pull)"
  fi

  # Smart dependency installation
  if [ "$FORCE_CLEAN" = true ]; then
    echo "🧹 Cleaning node_modules and package-lock.json..."
    rm -rf node_modules package-lock.json
    echo "📥 Fresh installing dependencies..."
    npm ci --production=false
  elif [ ! -d "node_modules" ]; then
    echo "📥 No node_modules found, installing dependencies..."
    npm ci --production=false
  elif [ "package.json" -nt "node_modules" ]; then
    echo "📥 package.json updated, reinstalling dependencies..."
    npm ci --production=false
  else
    echo "✅ Dependencies up to date, skipping install"
  fi

  # Build the project
  if [ "$USE_PRERENDER_BUILD" = true ]; then
    echo "⚙  Building project with pre-rendering..."
    npm run build:prerender
  else
    echo "⚙  Building project..."
    npm run build
  fi

  # Clean and copy build files
  echo "🧹 Cleaning old files..."
  rm -rf "$DEST"/*
  mkdir -p "$DEST"

  echo "📂 Copying new build to $DEST..."
  if [ -d "$SRC/dist" ]; then
    cp -r "$SRC/dist/"* "$DEST/"
  else
    echo "❌ Build directory not found: $SRC/dist"
    exit 1
  fi

  echo "🔐 Fixing permissions..."
  chown -R www-data:www-data "$DEST"
  chmod -R 755 "$DEST"

  echo "✅ $NAME deployed successfully!"
}

# ─────────────────────────────
# Main Execution
# ─────────────────────────────
echo "====================================================================="
echo " 🌐 Starting deployment for all websites — $NOW"
echo "====================================================================="

# Deploy IO-SAS with optional pre-rendering
deploy_project "IO-SAS Website" "$IOSAS_REPO" "$IOSAS_DIST" "$USE_PRERENDER"

# Deploy other sites (no pre-rendering)
deploy_project "JD Montañez Website" "$JDMON_REPO" "$JDMON_DIST" false
deploy_project "Doña Juana Website" "$DONYA_REPO" "$DONYA_DIST" false

echo ""
echo "🔄 Reloading Nginx..."
systemctl reload nginx

echo ""
echo "====================================================================="
echo "✅ All deployments completed successfully at $NOW!"
echo "====================================================================="
