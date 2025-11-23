import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import './styles/index.css';
import rootToHex from './utils/rootToHex.js';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Forms from './pages/Forms.jsx';
import Calendar from './pages/Calendar.jsx';
import Announcement from './pages/Announcement.jsx';
import Developers from './pages/Developers.jsx';
import Organizations from './pages/Organizations.jsx';
import Organization from './pages/Organization.jsx';
import AuthComplete from './pages/AuthComplete.jsx';
import Bug from './pages/Bug.jsx';

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
						<Route path='/about' element={<About />} />
						<Route path='/forms' element={<Forms />} />
						<Route path='/calendar' element={<Calendar />} />
						<Route path='/announcements/:id' element={<Announcement />} />
						<Route path='/developers' element={<Developers />} />
						<Route path='/organizations' element={<Organizations />} />
						<Route path='/organizations/:id' element={<Organization />} />
						<Route path='/auth-complete' element={<AuthComplete />} />
						<Route path='/bug' element={<Bug />} />

						<Route path='*' element={<Navigate to='/' replace />} />
					</Routes>
				</BrowserRouter>
			</App>
		</DesignConfig>
	);
};

export const API_Route = import.meta.env.DEV ? 'http://localhost:3001' : 'https://api.iosas.online';

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<MobileProvider>
			<Main />
		</MobileProvider>
	</React.StrictMode>
);
