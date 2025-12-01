#!/bin/bash

# Pre-rendering Helper Script
# This script helps you build and test pre-rendered pages

set -e

echo ""
echo "🎨 OSAS Website Pre-rendering Tool"
echo "=================================="
echo ""

# Function to show help
show_help() {
    echo "Usage: ./prerender-helper.sh [command]"
    echo ""
    echo "Commands:"
    echo "  test       - Test API connection and show routes that will be pre-rendered"
    echo "  build      - Build with pre-rendering (full production build)"
    echo "  verify     - Verify metadata in pre-rendered files"
    echo "  preview    - Build with pre-rendering and start preview server"
    echo "  clean      - Remove dist folder"
    echo ""
    echo "Examples:"
    echo "  ./prerender-helper.sh test"
    echo "  ./prerender-helper.sh build"
    echo "  ./prerender-helper.sh verify"
    echo ""
}

# Function to test
test_prerender() {
    echo "🧪 Testing pre-render configuration..."
    echo ""
    node test-prerender.js
}

# Function to build
build_prerender() {
    echo "🏗️  Building with pre-rendering..."
    echo ""
    npm run build:prerender
    echo ""
    echo "✅ Build complete! Output in dist/"
    echo ""
}

# Function to preview
preview_build() {
    echo "🏗️  Building with pre-rendering..."
    echo ""
    npm run build:prerender
    echo ""
    echo "🌐 Starting preview server..."
    echo ""
    npm run preview
}

# Function to clean
clean_build() {
    echo "🧹 Cleaning build directory..."
    echo ""
    rm -rf dist
    echo "✅ Cleaned!"
    echo ""
}

# Function to verify
verify_metadata() {
    echo "🔍 Verifying pre-rendered metadata..."
    echo ""
    npm run verify:metadata
}

# Parse command
case "$1" in
    test)
        test_prerender
        ;;
    build)
        build_prerender
        ;;
    verify)
        verify_metadata
        ;;
    preview)
        preview_build
        ;;
    clean)
        clean_build
        ;;
    help|-h|--help)
        show_help
        ;;
    *)
        if [ -z "$1" ]; then
            show_help
        else
            echo "❌ Unknown command: $1"
            echo ""
            show_help
            exit 1
        fi
        ;;
esac
