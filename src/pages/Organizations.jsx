import React, { useState, useEffect, useRef } from 'react';
import {
	Flex,
	Typography,
	Card,
	Row,
	Col,
	Spin,
	Alert,
	Segmented,
	Empty
} from 'antd';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

const { Title, Text, Paragraph } = Typography;

const Organizations = () => {
	const header = useRef(null);
	const [headerSize, setHeaderSize] = useState(0);
	const isMobile = useMobile();
	const navigate = useNavigate();

	const [organizations, setOrganizations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		if (!header || !header.current) return;
		const listener = () => setHeaderSize(header.current.offsetHeight);
		listener();
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [header]);

	useEffect(() => {
		const fetchOrganizations = async () => {
			setLoading(true);
			try {
				let url = `${API_Route}/organizations`;
				if (filter !== 'all') {
					url += `?type=${filter}`;
				}
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Failed to fetch organizations');
				}
				const data = await response.json();
				setOrganizations(data.organizations);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchOrganizations();
	}, [filter]);

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto'
	};

	return (
		<>
			<Header ref={header} activeKey='organizations' />
			<main
				style={{
					paddingTop: headerSize
				}}
			>
				{/* Hero Section */}
				<div
					style={{
						position: 'relative',
						textAlign: 'center',
						color: 'white',
						padding: isMobile ? '64px 16px' : '64px 32px',
						backgroundImage: 'url(/Background.jpg)',
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							zIndex: 1
						}}
					/>
					<div style={{ position: 'relative', zIndex: 2 }}>
						<Text style={{ color: 'white', marginTop: 0 }}>
							Student Organizations
						</Text>
						<Title style={{ color: 'white', marginTop: 0 }}>
							Explore Our Campus Groups
						</Title>
						<Paragraph style={{ color: 'white', marginTop: 0 }}>
							Discover the diverse student organizations that
							enrich campus life.
						</Paragraph>
					</div>
				</div>
			</main>
			<section style={sectionStyle}>
				<Flex vertical align='center' gap={32}>
					<Segmented
						options={[
							{ label: 'All', value: 'all' },
							{ label: 'College-Wide', value: 'college-wide' },
							{ label: 'Institute-Wide', value: 'institute-wide' }
						]}
						value={filter}
						onChange={setFilter}
					/>
					{loading ? (
						<Spin size='large' />
					) : error ? (
						<Alert
							message='Error'
							description={error}
							type='error'
							showIcon
						/>
					) : (
						<Row gutter={[32, 32]} style={{ width: '100%' }}>
							{organizations.length > 0 ? (
								organizations.map((org) => (
									<Col key={org.id} xs={24} sm={12} md={8}>
										<Card
											hoverable
											cover={
												<img
													alt={org.shortName}
													src={org.cover}
													style={{
														height: 150,
														objectFit: 'cover'
													}}
												/>
											}
											onClick={() =>
												navigate(
													`/organizations/${org.id}`
												)
											}
										>
											<Card.Meta
												avatar={
													<img
														src={org.logo}
														alt={`${org.shortName} logo`}
														style={{
															width: 48,
															height: 48,
															borderRadius: '50%'
														}}
													/>
												}
												title={org.shortName}
												description={org.fullName}
											/>
										</Card>
									</Col>
								))
							) : (
								<Empty
									description='No organizations found'
									style={{ width: '100%' }}
								/>
							)}
						</Row>
					)}
				</Flex>
			</section>
			<Footer />
		</>
	);
};

export default Organizations;
