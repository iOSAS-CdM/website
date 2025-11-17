import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { Flex, Typography, Spin, Alert, Image, Divider, Card, Row, Col, Avatar, Empty } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

const { Title, Text, Paragraph } = Typography;

const Organization = () => {
	const { id } = useParams();
	const header = useRef(null);
	const [headerSize, setHeaderSize] = useState(0);
	const isMobile = useMobile();

	const [organization, setOrganization] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!header || !header.current) return;
		const listener = () => setHeaderSize(header.current.offsetHeight);
		listener();
		window.addEventListener('resize', listener);
		window.addEventListener('scroll', listener);
		return () => {
			window.removeEventListener('resize', listener);
			window.removeEventListener('scroll', listener);
		};
	}, [header]);

	useEffect(() => {
		const fetchOrganization = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${API_Route}/organizations/${id}`);
				if (!response.ok) {
					throw new Error('Failed to fetch organization details');
				}
				const data = await response.json();
				setOrganization(data);

				// Update page title
				document.title = `${data.shortName} - ${data.name} | OSAS`;

				// Update meta description
				const metaDescription = document.querySelector('meta[name="description"]');
				const description = data.description || `${data.name} - A ${data.type} organization at Colegio de Montalban`;
				if (metaDescription) {
					metaDescription.setAttribute('content', description);
				}

				// Update Open Graph tags
				const ogTitle = document.querySelector('meta[property="og:title"]');
				if (ogTitle) ogTitle.setAttribute('content', `${data.shortName} | OSAS`);

				const ogDescription = document.querySelector('meta[property="og:description"]');
				if (ogDescription) ogDescription.setAttribute('content', description);

				const ogImage = document.querySelector('meta[property="og:image"]');
				if (ogImage && data.cover) {
					ogImage.setAttribute('content', data.cover);
				}

				const ogUrl = document.querySelector('meta[property="og:url"]');
				if (ogUrl) ogUrl.setAttribute('content', `https://osas.cdm.edu.ph/organizations/${id}`);

				// Update Twitter Card tags
				const twitterTitle = document.querySelector('meta[property="twitter:title"]');
				if (twitterTitle) twitterTitle.setAttribute('content', `${data.shortName} | OSAS`);

				const twitterDescription = document.querySelector('meta[property="twitter:description"]');
				if (twitterDescription) twitterDescription.setAttribute('content', description);

				const twitterImage = document.querySelector('meta[property="twitter:image"]');
				if (twitterImage && data.cover) {
					twitterImage.setAttribute('content', data.cover);
				}

				// Update canonical URL
				let canonical = document.querySelector('link[rel="canonical"]');
				if (canonical) {
					canonical.setAttribute('href', `https://osas.cdm.edu.ph/organizations/${id}`);
				} else {
					canonical = document.createElement('link');
					canonical.setAttribute('rel', 'canonical');
					canonical.setAttribute('href', `https://osas.cdm.edu.ph/organizations/${id}`);
					document.head.appendChild(canonical);
				}

			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			};
		};

		fetchOrganization();

		// Cleanup function to reset metadata
		return () => {
			document.title = 'Office of Student Affairs and Services | Colegio de Montalban';

			const metaDescription = document.querySelector('meta[name="description"]');
			if (metaDescription) {
				metaDescription.setAttribute('content', 'Your campus compass. OSAS at Colegio de Montalban provides comprehensive student welfare, development programs, guidance counseling, student organizations, downloadable forms, and campus announcements. Fostering holistic development and student success.');
			}

			const ogTitle = document.querySelector('meta[property="og:title"]');
			if (ogTitle) ogTitle.setAttribute('content', 'Office of Student Affairs and Services | Colegio de Montalban');

			const ogDescription = document.querySelector('meta[property="og:description"]');
			if (ogDescription) {
				ogDescription.setAttribute('content', 'Your campus compass. OSAS at Colegio de Montalban provides comprehensive student welfare, development programs, guidance counseling, student organizations, downloadable forms, and campus announcements. Fostering holistic development and student success.');
			}

			const ogImage = document.querySelector('meta[property="og:image"]');
			if (ogImage) ogImage.setAttribute('content', '/CdM-OSAS Banner.png');

			const ogUrl = document.querySelector('meta[property="og:url"]');
			if (ogUrl) ogUrl.setAttribute('content', 'https://osas.cdm.edu.ph/');

			const twitterTitle = document.querySelector('meta[property="twitter:title"]');
			if (twitterTitle) twitterTitle.setAttribute('content', 'Office of Student Affairs and Services | Colegio de Montalban');

			const twitterDescription = document.querySelector('meta[property="twitter:description"]');
			if (twitterDescription) {
				twitterDescription.setAttribute('content', 'Your campus compass. OSAS at Colegio de Montalban provides comprehensive student welfare, development programs, guidance counseling, student organizations, downloadable forms, and campus announcements. Fostering holistic development and student success.');
			}

			const twitterImage = document.querySelector('meta[property="twitter:image"]');
			if (twitterImage) twitterImage.setAttribute('content', '/CdM-OSAS Banner.png');

			const canonical = document.querySelector('link[rel="canonical"]');
			if (canonical) canonical.setAttribute('href', 'https://osas.cdm.edu.ph/');
		};
	}, [id]);

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto',
	};

	if (loading) {
		return (
			<>
				<Header ref={header} activeKey='organizations' />
				<main style={{ paddingTop: headerSize, textAlign: 'center', padding: '64px' }}>
					<Spin size='large' />
				</main>
				<Footer />
			</>
		);
	}

	if (error) {
		return (
			<>
				<Header ref={header} activeKey='organizations' />
				<main style={{ paddingTop: headerSize, padding: '64px' }}>
					<Alert message='Error' description={error} type='error' showIcon />
				</main>
				<Footer />
			</>
		);
	}

	return (
		<>
			<Header ref={header} activeKey='organizations' />
			{organization && (
				<>
					<main style={{ paddingTop: headerSize }}>
						<section style={sectionStyle}>
							<Flex vertical gap={32} align='center'>
								<Image
									preview={false}
									src={organization.cover}
									width={'100%'}
									alt={organization.shortName}
									style={{ width: '100%', height: isMobile ? 200 : 400, objectFit: 'cover' }}
								/>
								<Flex vertical align='stretch' gap={32} style={{ width: '100%' }}>
									<Flex justify='start' align='center' gap={16}>
										<Avatar shape='square' src={organization.logo} size={isMobile ? 64 : 128} />
										<Flex vertical justify='center'>
											<Title level={isMobile ? 4 : 2} style={{ margin: 0 }}>{organization.fullName}</Title>
											<Title level={isMobile ? 5 : 4} type='secondary' style={{ margin: 0 }}>{organization.shortName}</Title>
										</Flex>
									</Flex>
									<Divider />
									<Title level={3}>Officers</Title>
									<Row gutter={[32, 32]} style={{ width: '100%' }}>
										{organization.members && organization.members.length > 0 ? organization.members.map((member) => (
											<Col key={member.student.id} xs={24} sm={16} md={12} lg={8}>
												<Card>
													<Card.Meta
														avatar={<Avatar shape='square' src={member.student.profilePicture + `?random=${Math.random()}`} size={64} />}
														title={`${member.student.name.first} ${member.student.name.last}`}
														description={member.role}
													/>
												</Card>
											</Col>
										)) : <Empty description='No officers found' style={{ width: '100%' }} />}
									</Row>
								</Flex>
							</Flex>
						</section>
					</main>
				</>
			)}
			<Footer />
		</>
	);
};

export default Organization;
