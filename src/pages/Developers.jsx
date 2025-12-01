import React from 'react';
import { Flex, Typography, Avatar, Card, Row, Col, Button } from 'antd';
import {
	MailOutlined,
	GithubOutlined,
	LinkedinOutlined,
	UserOutlined
} from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Title, Text, Paragraph } = Typography;

const developers = [
	{
		name: 'Edna Sophia Fernandez',
		role: 'Project Manager & Lead Researcher',
		avatar: '/developers/phia.jpg'
	},
	{
		name: 'Daniel John Baynosa',
		role: 'Lead Developer',
		avatar: 'https://avatars.githubusercontent.com/u/63223301?v=4',
		email: 'danieljohnbyns@gmail.com',
		github: 'https://github.com/danieljohnbyns',
		linkedin: 'https://www.linkedin.com/in/danieljohnbyns/'
	},
	{
		name: 'Alexander Zyrol',
		role: 'Manuscript Writer',
		avatar: '/developers/zy.jpg'
	},
	{
		name: 'Noverjohn Rivas',
		role: 'Manuscript Writer',
		avatar: '/developers/rivas.jpg'
	}
];

const Contact = () => {
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const isMobile = useMobile();

	React.useEffect(() => {
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

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto'
	};

	return (
		<>
			<Header ref={header} activeKey='developers' />

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
							Meet the Team
						</Text>
						<Title style={{ color: 'white', marginTop: 0 }}>
							Contact the Developers
						</Title>
						<Paragraph style={{ color: 'white', marginTop: 0 }}>
							Get in touch with the team behind this project.
						</Paragraph>
					</div>
				</div>
			</main>

			<section style={sectionStyle}>
				<Flex vertical align='center' gap={32}>
					<Row
						gutter={[32, 32]}
						justify='center'
						style={{ width: '100%' }}
					>
						{developers.map((dev, index) => (
							<Col key={index} xs={24} sm={12} md={8}>
								<Card
									hoverable
									cover={
										dev.avatar ? (
											<img
												alt={dev.name}
												src={dev.avatar}
												style={{
													height: 256,
													objectFit: 'cover'
												}}
											/>
										) : (
											<div
												style={{
													height: 256,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor: '#f0f0f0'
												}}
											>
												<Avatar size={128} shape='square' icon={<UserOutlined />} />
											</div>
										)
									}
								>
									<Card.Meta
										title={dev.name}
										description={dev.role}
									/>
									<Flex
										justify='center'
										gap={16}
										style={{ marginTop: 16 }}
									>
										{dev.email && (
											<Button
												icon={<MailOutlined />}
												href={`mailto:${dev.email}`}
												target='_blank'
											/>
										)}
										{dev.github && (
											<Button
												icon={<GithubOutlined />}
												href={dev.github}
												target='_blank'
											/>
										)}
										{dev.linkedin && (
											<Button
												icon={<LinkedinOutlined />}
												href={dev.linkedin}
												target='_blank'
											/>
										)}
									</Flex>
								</Card>
							</Col>
						))}
					</Row>
				</Flex>
			</section>

			<section style={sectionStyle}>
				<Flex vertical align='center' gap={16}>
					<Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
						Special Thanks to Our Sponsors
					</Title>
					<Row gutter={[32, 32]} justify='center' style={{ width: '100%' }}>
						<Col xs={24} sm={12} md={8}>
							<Card hoverable style={{ textAlign: 'center' }}>
								<Title level={4} style={{ marginBottom: '8px' }}>Ely Rose Bosangit</Title>
								<Text type='secondary'>Project Sponsor</Text>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8}>
							<Card hoverable style={{ textAlign: 'center' }}>
								<Title level={4} style={{ marginBottom: '8px' }}>James Andrew Andrada</Title>
								<Text type='secondary'>Project Sponsor</Text>
							</Card>
						</Col>
					</Row>
					<Paragraph style={{ textAlign: 'center', marginTop: '32px', fontSize: '16px' }}>
						We are deeply grateful for the generous support of our sponsors. Their contributions have been instrumental in making this project possible.
					</Paragraph>
				</Flex>
			</section>

			<Footer />
		</>
	);
};

export default Contact;
