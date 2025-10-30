import React, { useState, useEffect } from 'react';
import { Flex, Typography, Card, Row, Col, Button, Spin, Alert, Empty } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

const { Title, Paragraph } = Typography;

const Forms = () => {
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const isMobile = useMobile();

	const [forms, setForms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	React.useEffect(() => {
		if (!header || !header.current) return;
		const listener = () => setHeaderSize(header.current.offsetHeight);
		listener();
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [header]);

	useEffect(() => {
		async function fetchForms() {
			try {
				const response = await fetch(`${API_Route}/repositories/public`);
				if (!response.ok) {
					throw new Error('Failed to fetch forms');
				}
				const data = await response.json();
				setForms(data.files);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchForms();
	}, []);

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto',
		textAlign: 'center'
	};

	// if (loading) {
	// 	return (
	// 		<>
	// 			<Header ref={header} activeKey='forms' />
	// 			<main style={{ paddingTop: headerSize, textAlign: 'center', padding: '64px' }}>
	// 				<Spin size='large' />
	// 			</main>
	// 			<Footer />
	// 		</>
	// 	);
	// }

	// if (error) {
	// 	return (
	// 		<>
	// 			<Header ref={header} activeKey='forms' />
	// 			<main style={{ paddingTop: headerSize, padding: '64px' }}>
	// 				<Alert message='Error' description={error} type='error' showIcon />
	// 			</main>
	// 			<Footer />
	// 		</>
	// 	);
	// }

	return (
		<>
			<Header ref={header} activeKey='forms' />
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
						<Title style={{ color: 'white', marginTop: 0 }}>Downloadable Forms</Title>
						<Paragraph style={{ color: 'white', marginTop: 0 }}>
							Access all necessary student-related forms here. Click to download.
						</Paragraph>
					</div>
				</div>

				{/* Forms Section */}
				{!loading && !error && forms.length === 0 && (
					<section style={sectionStyle}>
						<Empty description='No forms available at the moment.' />
					</section>
				)}

				{!loading && !error && forms.length > 0 && (
					<section style={sectionStyle}>
						<Row gutter={[16, 16]}>
							{forms.map((form) => (
								<Col xs={24} sm={12} md={8} lg={6} key={form.id}>
									<Card>
										<Flex vertical align='stretch' gap={16}>
											<Title level={4}>{form.name}</Title>
											<a href={form.publicUrl} target='_blank' rel='noopener noreferrer' download>
												<Button type='primary' size='small' icon={<DownloadOutlined />} >Download</Button>
											</a>
										</Flex>
									</Card>
								</Col>
							))}
						</Row>
					</section>
				)}
			</main>
			<Footer />
		</>
	);
};

export default Forms;
