import React from 'react';

const MobileContext = React.createContext(false);

export const MobileProvider = ({ children }) => {
	const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1024 * 0.75);

	React.useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<MobileContext.Provider value={isMobile}>
			{children}
		</MobileContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMobile = () => {
	return React.useContext(MobileContext);
};