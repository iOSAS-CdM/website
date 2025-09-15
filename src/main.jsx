import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import './styles/index.css';
import rootToHex from './utils/rootToHex.js';

import Home from './pages/Home.jsx';

import { ConfigProvider as DesignConfig, App, theme as DesignTheme } from 'antd';


const PRIMARY_COLOR = rootToHex('var(--primary)');

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DesignConfig
			theme={{
				algorithm: [
					DesignTheme.defaultAlgorithm
				],
				cssVar: true,
				token: {
					colorPrimary: PRIMARY_COLOR,
					colorInfo: PRIMARY_COLOR,
					fontSize: 16,
					sizeUnit: 2,
					borderRadius: 4
				}
			}}
		>
			<App>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='*' element={<Navigate to='/' replace />} />
					</Routes>
				</BrowserRouter>
			</App>
		</DesignConfig>
	</React.StrictMode>
);
