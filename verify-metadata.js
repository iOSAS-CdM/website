#!/usr/bin/env node

/**
 * Verify Pre-rendered Metadata
 * This script checks if metadata is properly rendered in the pre-rendered HTML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, 'dist');

function extractMetadata(html) {
	const metadata = {};

	// Extract title
	const titleMatch = html.match(/<title>(.*?)<\/title>/);
	metadata.title = titleMatch ? titleMatch[1] : null;

	// Extract meta description
	const descMatch = html.match(/<meta name="description" content="(.*?)"/);
	metadata.description = descMatch ? descMatch[1].substring(0, 100) + '...' : null;

	// Extract OG tags
	const ogTitleMatch = html.match(/<meta property="og:title" content="(.*?)"/);
	metadata.ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;

	const ogDescMatch = html.match(/<meta property="og:description" content="(.*?)"/);
	metadata.ogDescription = ogDescMatch ? ogDescMatch[1].substring(0, 100) + '...' : null;

	const ogImageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
	metadata.ogImage = ogImageMatch ? ogImageMatch[1] : null;

	const ogUrlMatch = html.match(/<meta property="og:url" content="(.*?)"/);
	metadata.ogUrl = ogUrlMatch ? ogUrlMatch[1] : null;

	// Extract Twitter tags
	const twitterTitleMatch = html.match(/<meta property="twitter:title" content="(.*?)"/);
	metadata.twitterTitle = twitterTitleMatch ? twitterTitleMatch[1] : null;

	const twitterImageMatch = html.match(/<meta property="twitter:image" content="(.*?)"/);
	metadata.twitterImage = twitterImageMatch ? twitterImageMatch[1] : null;

	// Extract canonical URL
	const canonicalMatch = html.match(/<link rel="canonical" href="(.*?)"/);
	metadata.canonical = canonicalMatch ? canonicalMatch[1] : null;

	return metadata;
}

function checkRoute(routePath, routeName) {
	const htmlPath = path.join(BUILD_DIR, routePath, 'index.html');

	if (!fs.existsSync(htmlPath)) {
		console.log(`❌ ${routeName}: File not found`);
		return false;
	}

	const html = fs.readFileSync(htmlPath, 'utf-8');
	const metadata = extractMetadata(html);

	const hasTitle = metadata.title && !metadata.title.includes('Office of Student Affairs and Services | Colegio de Montalban');
	const hasOgTitle = metadata.ogTitle && !metadata.ogTitle.includes('Office of Student Affairs and Services | Colegio de Montalban');
	const hasDescription = metadata.description && metadata.description.length > 50;
	const hasOgImage = metadata.ogImage && metadata.ogImage.includes('http');
	const hasCanonical = metadata.canonical && metadata.canonical.includes(routePath.replace('/index', ''));

	if (hasTitle && hasOgTitle && hasDescription && hasOgImage && hasCanonical) {
		console.log(`✅ ${routeName}: All metadata present`);
		console.log(`   Title: ${metadata.title}`);
		console.log(`   OG Image: ${metadata.ogImage.substring(0, 60)}...`);
		console.log(`   Canonical: ${metadata.canonical}\n`);
		return true;
	} else {
		console.log(`⚠️  ${routeName}: Some metadata missing`);
		if (!hasTitle) console.log(`   - Title is default or missing`);
		if (!hasOgTitle) console.log(`   - OG title is default or missing`);
		if (!hasDescription) console.log(`   - Description too short or missing`);
		if (!hasOgImage) console.log(`   - OG image missing`);
		if (!hasCanonical) console.log(`   - Canonical URL missing or wrong`);
		console.log('');
		return false;
	}
}

function main() {
	console.log('\n🔍 Verifying Pre-rendered Metadata\n');
	console.log('═'.repeat(60) + '\n');

	if (!fs.existsSync(BUILD_DIR)) {
		console.error('❌ Build directory not found! Run `npm run build:prerender` first.\n');
		process.exit(1);
	}

	// Check announcement routes
	console.log('📢 DYNAMIC ROUTES - Announcements\n');
	const announcementDirs = fs.readdirSync(path.join(BUILD_DIR, 'announcements')).filter(dir => {
		return fs.statSync(path.join(BUILD_DIR, 'announcements', dir)).isDirectory();
	});

	let announcementsPassed = 0;
	announcementDirs.forEach(id => {
		const passed = checkRoute(`announcements/${id}`, `Announcement (${id.substring(0, 8)}...)`);
		if (passed) announcementsPassed++;
	});

	// Check organization routes (if any)
	console.log('🏢 DYNAMIC ROUTES - Organizations\n');
	const orgPath = path.join(BUILD_DIR, 'organizations');
	if (fs.existsSync(orgPath)) {
		const orgDirs = fs.readdirSync(orgPath).filter(dir => {
			const fullPath = path.join(orgPath, dir);
			return fs.statSync(fullPath).isDirectory();
		});

		if (orgDirs.length > 0) {
			orgDirs.forEach(id => {
				checkRoute(`organizations/${id}`, `Organization (${id.substring(0, 8)}...)`);
			});
		} else {
			console.log('No organization routes found (API returned 0)\n');
		}
	} else {
		console.log('No organization routes found\n');
	}

	// Summary
	console.log('═'.repeat(60) + '\n');
	console.log('📊 Summary\n');
	console.log(`   Announcements checked: ${announcementDirs.length}`);
	console.log(`   Announcements passed:  ${announcementsPassed}`);

	if (announcementsPassed === announcementDirs.length) {
		console.log('\n✅ All dynamic routes have proper SSR metadata!\n');
		console.log('Benefits:');
		console.log('  • Search engines will see full content');
		console.log('  • Social media previews will work');
		console.log('  • Improved SEO ranking');
		console.log('  • Faster initial page loads\n');
	} else {
		console.log('\n⚠️  Some routes may not have complete metadata\n');
	}
}

main();
