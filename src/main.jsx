import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import './styles/index.css';
import rootToHex from './utils/rootToHex.js';

import Home from './pages/Home.jsx';

import { ConfigProvider as DesignConfig, App, theme as DesignTheme } from 'antd';

import { MobileProvider, useMobile } from './contexts/Mobile.jsx';

const PRIMARY_COLOR = rootToHex('var(--primary)');

// eslint-disable-next-line react-refresh/only-export-components
const Main = () => {
	const isMobile = useMobile();

	const theme = React.useMemo(() => ({
		algorithm: [
			DesignTheme.defaultAlgorithm
		],
		cssVar: true,
		token: {
			colorPrimary: PRIMARY_COLOR,
			colorInfo: PRIMARY_COLOR,
			fontSize: isMobile ? 12 : 16,
			sizeUnit: isMobile ? 1 : 2,
			borderRadius: 4
		}
	}), [isMobile])

	return (
		<DesignConfig
			theme={theme}
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
	);
};

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MobileProvider>
			<Main />
		</MobileProvider>
	</React.StrictMode>
);
