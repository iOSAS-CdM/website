#!/usr/bin/env node

/**
 * Test script to verify prerendering setup
 * Run: node test-prerender.js
 */

import fetch from 'node-fetch';

const API_URL = 'https://api.iosas.online';

console.log('\n🧪 Testing Prerender Configuration\n');
console.log('═'.repeat(50) + '\n');

async function testAPIConnection() {
	console.log('1️⃣  Testing API connection...');

	try {
		const response = await Promise.race([
			fetch(`${API_URL}/announcements`),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Timeout after 10s')), 10000)
			)
		]);

		if (response.ok) {
			const data = await response.json();
			console.log(`   ✅ API reachable`);
			console.log(`   📢 Found ${data.announcements?.length || 0} announcements\n`);
			return data.announcements || [];
		} else {
			console.log(`   ⚠️  API returned status ${response.status}\n`);
			return [];
		}
	} catch (error) {
		console.log(`   ❌ API connection failed: ${error.message}\n`);
		return [];
	}
}

async function testOrganizations() {
	console.log('2️⃣  Testing organizations endpoint...');

	try {
		const response = await Promise.race([
			fetch(`${API_URL}/organizations`),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Timeout after 10s')), 10000)
			)
		]);

		if (response.ok) {
			const data = await response.json();
			console.log(`   ✅ Organizations reachable`);
			console.log(`   🏢 Found ${data.organizations?.length || 0} organizations\n`);
			return data.organizations || [];
		} else {
			console.log(`   ⚠️  API returned status ${response.status}\n`);
			return [];
		}
	} catch (error) {
		console.log(`   ❌ Organizations fetch failed: ${error.message}\n`);
		return [];
	}
}

async function main() {
	const announcements = await testAPIConnection();
	const organizations = await testOrganizations();

	const staticRoutes = [
		'/', '/about', '/forms', '/calendar', '/developers',
		'/organizations', '/faqs', '/bug', '/privacy-policy',
		'/terms-of-service', '/auth-complete'
	];

	const dynamicRoutes = [
		...announcements.map(a => `/announcements/${a.id}`),
		...organizations.map(o => `/organizations/${o.id}`)
	];

	const totalRoutes = staticRoutes.length + dynamicRoutes.length;

	console.log('═'.repeat(50));
	console.log('\n📊 Summary\n');
	console.log(`   Static routes:  ${staticRoutes.length}`);
	console.log(`   Dynamic routes: ${dynamicRoutes.length}`);
	console.log(`   Total routes:   ${totalRoutes}\n`);

	if (dynamicRoutes.length > 0) {
		console.log('✅ Pre-rendering will work!\n');
		console.log('   Example dynamic routes:');
		dynamicRoutes.slice(0, 5).forEach(route => {
			console.log(`   • ${route}`);
		});
		if (dynamicRoutes.length > 5) {
			console.log(`   ... and ${dynamicRoutes.length - 5} more\n`);
		} else {
			console.log('');
		}
	} else {
		console.log('⚠️  No dynamic routes found (API may be down)\n');
		console.log('   Static routes will still be pre-rendered.\n');
	}

	console.log('Next steps:');
	console.log('   1. Run `npm run build` to test regular build');
	console.log('   2. Run `npm run build:prerender` for full pre-rendering\n');
}

main().catch(console.error);
