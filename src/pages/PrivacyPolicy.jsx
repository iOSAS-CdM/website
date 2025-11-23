import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';

import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

import privacyPolicyMarkdown from '../policies/privacy_policy.md?raw';

const PrivacyPolicy = () => {
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const isMobile = useMobile();

	React.useEffect(() => {
		if (!header || !header.current) return;

		const listener = () => {
			setHeaderSize(header.current.offsetHeight);
		};

		listener();
		window.addEventListener('resize', listener);
		window.addEventListener('scroll', listener);

		return () => {
			window.removeEventListener('resize', listener);
			window.removeEventListener('scroll', listener);
		};
	}, [header]);

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto',
		textAlign: 'center'
	};

	return (
		<>
			<Header ref={header} activeKey='' />

			<main style={{ marginTop: headerSize }}>
				{/* Hero Section */}
				<div style={{
					position: 'relative',
					textAlign: 'center',
					color: 'white',
					padding: isMobile ? '48px 16px' : '80px 32px',
					backgroundImage: 'url(/Background.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}>
					<div style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1
					}} />
					<div style={{ position: 'relative', zIndex: 2 }}>
						<Title style={{ color: 'white', marginTop: 0 }}>Privacy Policy</Title>
						<Paragraph style={{ color: 'white', marginTop: 0 }}>
							Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.
						</Paragraph>
					</div>
				</div>
			</main>

			<section style={{
				textAlign: 'left',
				...sectionStyle
			}}>
				<MarkdownPreview
					source={privacyPolicyMarkdown}
					wrapperElement={{ 'data-color-mode': 'light' }}
					style={{
						backgroundColor: 'transparent',
						textAlign: 'left',
						fontSize: isMobile ? 12 : 16
					}}
				/>
			</section>

			<Footer />
		</>
	);
};

export default PrivacyPolicy;
