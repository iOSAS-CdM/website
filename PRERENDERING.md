# Pre-rendering Configuration

This project uses **Puppeteer** to generate static HTML files for all routes at build time, improving SEO and initial load performance.

## How It Works

1. **Vite builds** the React app normally
2. **Preview server** starts on port 4173
3. **Puppeteer** crawls each route and saves rendered HTML:
   - Fetches dynamic routes from API (announcements, organizations)
   - Renders each page fully
   - Saves complete HTML with SEO meta tags and initial data
4. **Preview server** shuts down
5. **Static HTML files** are ready in `dist/` for deployment

## Build Process

```
npm run build:prerender
  ├─> vite build (creates dist/)
  ├─> vite preview (starts dev server)
  ├─> node prerender.js (generates HTML)
  └─> kills preview server
```

## Static Routes Pre-rendered

- `/` - Home
- `/about` - About
- `/forms` - Forms
- `/calendar` - Calendar
- `/developers` - Developers
- `/organizations` - Organizations list
- `/faqs` - FAQs
- `/bug` - Bug report
- `/privacy-policy` - Privacy Policy
- `/terms-of-service` - Terms of Service
- `/auth-complete` - Auth callback

## Dynamic Routes Pre-rendered

- `/announcements/:id` - All announcements (fetched from API at build time)
- `/organizations/:id` - All organizations (fetched from API at build time)

## Build Commands

```bash
# Development (no prerendering)
npm run dev

# Regular production build (no prerendering)
npm run build

# Production build WITH pre-rendering
npm run build:prerender

# Preview the build locally
npm run preview
```

## Configuration

### prerender.js
- `API_URL` - API endpoint for fetching dynamic routes
- `DEV_SERVER_URL` - Preview server URL (default: localhost:4173)
- `BUILD_DIR` - Output directory (default: dist/)
- Timeout settings for API calls and page rendering

### build-prerender.js
- Orchestrates the build → preview → prerender → cleanup workflow
- Automatically starts and stops the preview server

## Fallback Behavior

If the API is unavailable during build:
- ✅ Static routes will still be pre-rendered
- ⚠️ Dynamic routes will be skipped (warns in console)
- ✅ Build will complete successfully
- 🔄 Dynamic routes will work via client-side rendering

## Benefits

✅ **SEO**: Search engines see fully rendered HTML with all content  
✅ **Performance**: Instant first paint with pre-loaded content  
✅ **Social Media**: Link previews show actual content (Open Graph)  
✅ **Reliability**: Fallback to CSR if prerendering fails  
✅ **No Server**: Static files deployable to any CDN  

## Deployment

After running `npm run build:prerender`, deploy the `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

The site will work as a SPA but with pre-rendered HTML for SEO.

## Technical Details

- Uses Puppeteer in headless mode
- Waits for `networkidle0` + 3 seconds for API calls
- Creates directory structure matching routes
- Each route gets its own `index.html`
- Original SPA hydration still works after page load

## Troubleshooting

**Preview server won't start:**
- Check if port 4173 is already in use
- Kill any existing Vite processes: `pkill -9 node`

**Routes not rendering:**
- Ensure API is accessible at build time
- Check console for fetch errors
- Increase timeout in `prerender.js`

**Build hangs:**
- Preview server may not have started
- Check for JavaScript errors in pages
- Try building without prerendering first: `npm run build`

## Notes

- Pre-rendering adds ~30-60 seconds to build time
- Development mode (`npm run dev`) works normally without pre-rendering
- After deployment, pages hydrate into a full React SPA
- API calls still happen client-side for fresh data
- Pre-rendered HTML is just for initial load and SEO
