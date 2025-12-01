# OSAS Website - Colegio de Montalban

Official website for the Office of Student Affairs and Services at Colegio de Montalban.

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool with HMR
- **React Router 7** - Client-side routing
- **Ant Design 5** - UI component library
- **SWC** - Fast JavaScript compiler

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Building

```bash
# Regular build (client-side only)
npm run build

# Build with pre-rendering (SEO optimized)
npm run build:prerender
```

## Pre-rendering

This project supports **static site generation** for improved SEO and performance. The pre-rendering process:

1. Fetches all dynamic routes from the API (announcements, organizations)
2. Renders each page with Puppeteer
3. Saves fully-rendered HTML files for each route
4. Enables instant page loads and better search engine indexing

See [PRERENDERING.md](./PRERENDERING.md) for detailed documentation.

### When to use pre-rendering:

- ✅ Production deployments
- ✅ When SEO is important
- ✅ When you want faster initial page loads
- ❌ During development (use `npm run dev`)

## Project Structure

```
src/
├── components/     # Reusable components (Header, Footer)
├── contexts/       # React contexts (Mobile detection)
├── pages/          # Page components (routes)
├── policies/       # Markdown policy documents
├── styles/         # Global styles and CSS
└── utils/          # Helper functions
```

## Features

- 📱 Responsive design (mobile-first)
- 🔍 SEO optimized with dynamic meta tags
- 🎨 Ant Design component system
- 📝 Markdown rendering for content
- 🖼️ Image optimization
- 📅 Event calendar
- 📋 Downloadable forms
- 🏢 Organization directory
- 📢 Announcements system

## API Integration

The app connects to a backend API:
- **Development**: `http://localhost:3001`
- **Production**: `https://api.iosas.online`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prerender` - Build with pre-rendering
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally with `npm run dev`
4. Submit a pull request

## License

© Colegio de Montalban 2025
