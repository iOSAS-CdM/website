import React from 'react';

import { Flex, Tabs, Image, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { useMobile } from '../contexts/Mobile';

/**
 * @type {React.FC<{ activeKey: 'home' | 'about' | 'forms' | 'calendar' | 'organizations' | 'contact' }>}>}
 */
const Header = (props) => {
	const { activeKey, ref } = props;

	const isMobile = useMobile();

	const [menuOpen, setMenuOpen] = React.useState(false);
	const [headerSize, setHeaderSize] = React.useState(0);
	React.useEffect(() => {
		if (!ref || !ref.current) return;

		const listener = () => {
			setHeaderSize(ref.current.offsetHeight);
		};

		listener();
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [ref, menuOpen]);

	return (
		<Flex
			ref={ref}
			justify='space-between'
			align='center'
			gap={32}
			style={{
				padding: isMobile ? '8px 16px' : '16px 32px',
				borderBottom: '1px solid var(--ant-color-border)'
			}}
		>
			<Image
				src='/Logo.png'
				preview={false}
				alt='Logo'
				style={{
					height: isMobile ? 64 * 0.75 : 64
				}}
			/>

			<Button
				type='primary'
				icon={menuOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				style={{
					display: isMobile ? 'block' : 'none'
				}}
				onClick={() => setMenuOpen(!menuOpen)}
			/>

			<div
				style={{
					position: isMobile ? 'absolute' : 'static',
					top: headerSize,
					right: 0,
					height: isMobile ? `calc(100vh - ${headerSize}px)` : 'auto',

					display: isMobile ? 'flex' : 'block',
					justifyContent: 'stretch',
					alignItems: 'center',

					backgroundColor: isMobile ? 'var(--ant-color-white)' : 'transparent',

					zIndex: isMobile ? 1000 : 'auto',
					transform: isMobile ? (menuOpen ? 'translateX(0)' : 'translateX(100%)') : 'none',
					transition: 'transform var(--transition)'
				}}
			>
				<div
					style={{
						height: '100%',
						boxSizing: 'border-box',
						padding: isMobile ? '16px' : 0,

						display: 'flex',
						flexDirection: isMobile ? 'column' : 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: 32
					}}
				>
					<Tabs
						activeKey={activeKey}
						tabPosition={isMobile ? 'right' : 'top'}
						items={[
							{
								label: 'Home',
								key: 'home'
							},
							{
								label: 'About',
								key: 'about'
							},
							{
								label: 'Forms',
								key: 'forms'
							},
							{
								label: 'Calendar',
								key: 'calendar'
							},
							{
								label: 'Organizations',
								key: 'organizations'
							},
							{
								label: 'Contact',
								key: 'contact'
							}
						]}
					/>
				</div>
			</div>
		</Flex>
	);
};

export default Header;