import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// API endpoint (production URL since this runs at build time)
const API_URL = 'https://api.iosas.online';
const BUILD_DIR = path.join(__dirname, 'dist');
const DEV_SERVER_URL = 'http://localhost:4173'; // Vite preview server

async function getRoutesToPrerender() {
	const routes = [
		'/',
		'/about',
		'/forms',
		'/calendar',
		'/developers',
		'/organizations',
		'/faqs',
		'/bug',
		'/privacy-policy',
		'/terms-of-service',
		'/auth-complete'
	];

	console.log('\n🔍 Fetching dynamic routes for prerendering...\n');

	try {
		// Fetch announcements with timeout
		const announcementsRes = await Promise.race([
			fetch(`${API_URL}/announcements`),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Timeout')), 10000)
			)
		]);

		if (announcementsRes.ok) {
			const data = await announcementsRes.json();
			if (data.announcements && Array.isArray(data.announcements)) {
				data.announcements.forEach(announcement => {
					routes.push(`/announcements/${announcement.id}`);
				});
				console.log(`✓ Found ${data.announcements.length} announcements to prerender`);
			}
		} else {
			console.warn('⚠ Could not fetch announcements for prerendering (non-200 response)');
		}
	} catch (error) {
		console.warn('⚠ Error fetching announcements:', error.message);
		console.warn('  → Building without announcement routes (will use client-side rendering)');
	}

	try {
		// Fetch organizations with timeout
		const organizationsRes = await Promise.race([
			fetch(`${API_URL}/organizations`),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Timeout')), 10000)
			)
		]);

		if (organizationsRes.ok) {
			const data = await organizationsRes.json();
			if (data.organizations && Array.isArray(data.organizations)) {
				data.organizations.forEach(org => {
					routes.push(`/organizations/${org.id}`);
				});
				console.log(`✓ Found ${data.organizations.length} organizations to prerender`);
			}
		} else {
			console.warn('⚠ Could not fetch organizations for prerendering (non-200 response)');
		}
	} catch (error) {
		console.warn('⚠ Error fetching organizations:', error.message);
		console.warn('  → Building without organization routes (will use client-side rendering)');
	}

	console.log(`\n📄 Total routes to prerender: ${routes.length}\n`);
	return routes;
}

async function prerenderRoute(browser, route) {
	const page = await browser.newPage();

	try {
		const url = `${DEV_SERVER_URL}${route}`;
		console.log(`  Rendering: ${route}`);

		// Navigate to page
		await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

		// For dynamic routes (announcements, organizations), wait longer for metadata updates
		const isDynamicRoute = route.includes('/announcements/') || route.includes('/organizations/');
		const waitTime = isDynamicRoute ? 5000 : 2000;

		// Wait for API calls and metadata updates to complete
		await new Promise(resolve => setTimeout(resolve, waitTime));

		// Additional check: wait for metadata to be updated (for dynamic routes)
		if (isDynamicRoute) {
			try {
				// Wait for og:title to be updated (indicates metadata is ready)
				await page.waitForFunction(
					() => {
						const ogTitle = document.querySelector('meta[property="og:title"]');
						return ogTitle && !ogTitle.content.includes('Office of Student Affairs and Services | Colegio de Montalban');
					},
					{ timeout: 5000 }
				);
			} catch (e) {
				// Metadata might not update, continue anyway
				console.log(`    ⚠ Metadata may not be fully updated`);
			}
		}

		// Get the rendered HTML
		const html = await page.content();

		// Create directory structure
		const routePath = route === '/' ? '/index' : route;
		const filePath = path.join(BUILD_DIR, routePath, 'index.html');
		const dirPath = path.dirname(filePath);

		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}

		// Write the HTML file
		fs.writeFileSync(filePath, html);
		console.log(`  ✓ Saved: ${filePath}`);

		return true;
	} catch (error) {
		console.error(`  ✗ Error rendering ${route}:`, error.message);
		return false;
	} finally {
		await page.close();
	}
}

async function main() {
	console.log('\n🎨 Starting pre-rendering process...\n');
	console.log(`📂 Build directory: ${BUILD_DIR}\n`);

	// Check if dist directory exists
	if (!fs.existsSync(BUILD_DIR)) {
		console.error('❌ Build directory not found! Run `npm run build` first.');
		process.exit(1);
	}

	// Get routes to prerender
	const routes = await getRoutesToPrerender();

	// Launch browser
	console.log('\n🚀 Launching browser...\n');
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	try {
		// Prerender each route
		let successCount = 0;
		for (const route of routes) {
			const success = await prerenderRoute(browser, route);
			if (success) successCount++;
		}

		console.log(`\n✅ Pre-rendering complete!`);
		console.log(`   ${successCount}/${routes.length} routes successfully rendered\n`);

	} finally {
		await browser.close();
	}
}

main().catch(console.error);
