#!/bin/bash
# =====================================================================
# Universal Deployment Script for IO-SAS, JD Montañez, and Doña Juana Websites
# Author: Daniel John Baynosa
# Location: /usr/local/bin/deploy_websites.sh
# Usage:
#   sudo bash deploy_websites.sh [--clean]
# Options:
#   --clean    Force clean install of dependencies
# =====================================================================

set -e  # Stop if any command fails
set -o pipefail

# ─────────────────────────────
# CONFIGURATION
# ─────────────────────────────
# Source repo directories
IOSAS_REPO="/root/website"
JDMON_REPO="/root/jd-website"
DONYA_REPO="/root/donya-website"

# Destination build directories
IOSAS_DIST="/var/www/iosas.online/website/dist"
JDMON_DIST="/var/www/jdmontañez.com/jd-website/dist"
DONYA_DIST="/var/www/donyajuana.com/donya-website/dist"

# Current timestamp
NOW=$(date '+%Y-%m-%d %H:%M:%S')

# Parse arguments
FORCE_CLEAN=false
if [ "$1" = "--clean" ]; then
  FORCE_CLEAN=true
  echo "🧹 Clean install mode enabled"
fi

# ─────────────────────────────
# Helper Function
# ─────────────────────────────
deploy_project() {
  local NAME=$1
  local SRC=$2
  local DEST=$3

  echo ""
  echo "─────────────────────────────"
  echo "🚀 Deploying $NAME — $NOW"
  echo "─────────────────────────────"

  cd "$SRC" || { echo "❌ Source not found: $SRC"; exit 1; }

  # Pull latest code
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
  echo "⚙  Building project..."
  npm run build

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

  # Fix permissions
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

deploy_project "IO-SAS Website" "$IOSAS_REPO" "$IOSAS_DIST"
deploy_project "JD Montañez Website" "$JDMON_REPO" "$JDMON_DIST"
deploy_project "Doña Juana Website" "$DONYA_REPO" "$DONYA_DIST"

echo ""
echo "🔄 Reloading Nginx..."
systemctl reload nginx

echo ""
echo "====================================================================="
echo "✅ All deployments completed successfully at $NOW!"
echo "====================================================================="
