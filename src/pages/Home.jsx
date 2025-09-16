import React from 'react';

import { Flex, Typography, Divider, Button } from 'antd';
import { BookOutlined, PhoneOutlined } from '@ant-design/icons';

import Header from '../components/Header';

import { useMobile } from '../contexts/Mobile';

const { Text, Title } = Typography;

const Home = () => {
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);

	React.useEffect(() => {
		if (!header || !header.current) return;

		const listener = () => {
			setHeaderSize(header.current.offsetHeight);
		};

		listener();
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [header]);

	const isMobile = useMobile();

	/** @type {[React.CSSProperties, React.Dispatch<React.SetStateAction<React.CSSProperties>>]} */
	const [sectionStyle, setSectionStyle] = React.useState();

	React.useEffect(() => {
		if (!headerSize) return;
		setSectionStyle({
			padding: `${isMobile ? 32 : 64}px`
		});
	}, [headerSize, isMobile]);

	return (
		<>
			<Header ref={header} activeKey='home' />

			<main
				style={{
					position: 'relative',
					minHeight: `calc(100vh - ${headerSize}px)`,
					boxSizing: 'border-box',

					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',

					backgroundColor: 'var(--ant-color-primary)',
					...sectionStyle
				}}
			>
				<div
					style={{
						color: 'var(--ant-color-white)',
						zIndex: 1
					}}
				>
					<Title level={4} style={{ color: 'currentColor' }}>Colegio de Montalban</Title>
					<Title level={1} style={{ color: 'currentColor' }}>Office of Student Affairs and Services</Title>
					<Text style={{ color: 'currentColor' }}><b>Your campus compass</b>. Guiding student welfare, development, and disciplinary matters.</Text>
					<Divider
						style={{ maxWidth: '100%', width: 256, height: 1, backgroundColor: 'var(--ant-color-white)' }}
					/>
					<Flex gap={16} wrap='wrap' justify='center'>
						<Button type='primary' icon={<BookOutlined />} href='/about'>About Us</Button>
						<Button type='default' icon={<PhoneOutlined />} href='/contact'>Contact Us</Button>
					</Flex>
				</div>

				<img
					src='/Background.jpg'
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100vw',
						height: '100%',

						filter: 'brightness(0.5) opacity(0.75) saturate(1.5) contrast(1.125)',
						objectFit: 'cover',
						pointerEvents: 'none',
						userSelect: 'none',
						zIndex: 0
					}}
				/>
			</main>

			<section style={{ ...sectionStyle }}>
				a
			</section >
		</>
	);
};

export default Home;