import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { Flex, Typography, Spin, Alert, Image, Divider, Card, Row, Col, Avatar, Empty } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

const { Title, Text, Paragraph } = Typography;

const OrganizationDetails = () => {
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
		return () => window.removeEventListener('resize', listener);
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
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			};
		};

		fetchOrganization();
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
						<Image
							preview={false}
							src={organization.cover}
							width={'100%'}
							alt={organization.shortName}
							style={{ width: '100%', height: isMobile ? 200 : 400, objectFit: 'cover' }}
						/>
					</main>
					<section style={sectionStyle}>
						<Flex vertical align='center' gap={32}>
							<Flex align='center' gap={16}>
								<Avatar src={organization.logo} size={isMobile ? 64 : 96} />
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
												avatar={<Avatar src={member.student.profilePicture} size={64} />}
												title={`${member.student.name.first} ${member.student.name.last}`}
												description={member.role}
											/>
										</Card>
									</Col>
								)) : <Empty description='No officers found' style={{ width: '100%' }} />}
							</Row>
						</Flex>
					</section>
				</>
			)}
			<Footer />
		</>
	);
};

export default OrganizationDetails;
