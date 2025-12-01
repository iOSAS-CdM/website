#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('\n🏗️  Building and pre-rendering website...\n');

// Step 1: Build the project
console.log('📦 Step 1: Building project with Vite...\n');
const build = spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: true });

build.on('close', (code) => {
	if (code !== 0) {
		console.error('\n❌ Build failed!\n');
		process.exit(code);
	}

	console.log('\n✅ Build complete!\n');

	// Step 2: Start preview server
	console.log('🌐 Step 2: Starting preview server...\n');
	const preview = spawn('npx', ['vite', 'preview', '--port', '4173'], {
		stdio: 'pipe',
		shell: true
	});

	let serverReady = false;

	preview.stdout.on('data', (data) => {
		const output = data.toString();
		if (output.includes('Local') && !serverReady) {
			serverReady = true;

			// Step 3: Run prerendering
			console.log('✅ Preview server ready!\n');
			console.log('🎨 Step 3: Pre-rendering routes...\n');

			const prerender = spawn('node', ['prerender.js'], {
				stdio: 'inherit',
				shell: true
			});

			prerender.on('close', (prerenderCode) => {
				// Step 4: Stop preview server
				preview.kill();

				if (prerenderCode !== 0) {
					console.error('\n❌ Pre-rendering failed!\n');
					process.exit(prerenderCode);
				}

				console.log('\n🎉 Build and pre-rendering complete!\n');
				console.log('📂 Output: dist/\n');
				process.exit(0);
			});
		}
	});

	preview.stderr.on('data', (data) => {
		// Suppress preview server logs unless error
		if (data.toString().includes('Error')) {
			console.error(data.toString());
		}
	});

	// Timeout fallback (30 seconds)
	setTimeout(() => {
		if (!serverReady) {
			console.error('\n❌ Preview server failed to start within 30 seconds\n');
			preview.kill();
			process.exit(1);
		}
	}, 30000);
});
