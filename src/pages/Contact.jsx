import React from 'react';
import { Flex, Typography, Avatar, Card, Row, Col, Button } from 'antd';
import { MailOutlined, GithubOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Title, Text } = Typography;

const developers = [
	{
		name: 'Edna Sophia Fernandez',
		role: 'Project Manager & Lead Researcher'
	},
	{
		name: 'Daniel John Baynosa',
		role: 'Lead Developer',
		avatar: 'https://avatars.githubusercontent.com/u/63223301?v=4',
		email: 'danieljohnbyns@gmail.com',
		github: 'https://github.com/danieljohnbyns',
		linkedin: 'https://www.linkedin.com/in/danieljohnbyns/',
	},
	{
		name: 'Alexander Zyrol',
		role: 'Manuscript Writer'
	},
	{
		name: 'Noverjohn Rivas',
		role: 'Manuscript Writer'
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
		return () => window.removeEventListener('resize', listener);
	}, [header]);

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto',
	};

	return (
		<>
			<Header ref={header} activeKey="contact" />
			<main style={{ paddingTop: headerSize }}>
				<section style={sectionStyle}>
					<Flex vertical align="center" gap={32}>
						<Title level={2}>Meet the Developers</Title>
						<Row gutter={[32, 32]} justify="center" style={{ width: '100%' }}>
							{developers.map((dev, index) => (
								<Col key={index} xs={24} sm={12} md={8}>
									<Card
										hoverable
										cover={dev.avatar ? (
											<img alt={dev.name} src={dev.avatar} style={{ height: 200, objectFit: 'cover' }} />
										) : (
											<div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
												<Avatar size={100} />
											</div>
										)}
									>
										<Card.Meta
											title={dev.name}
											description={dev.role}
										/>
										<Flex justify="center" gap={16} style={{ marginTop: 16 }}>
											{dev.email && (<Button icon={<MailOutlined />} href={`mailto:${dev.email}`} target="_blank" />)}
											{dev.github && (<Button icon={<GithubOutlined />} href={dev.github} target="_blank" />)}
											{dev.linkedin && (<Button icon={<LinkedinOutlined />} href={dev.linkedin} target="_blank" />)}
										</Flex>
									</Card>
								</Col>
							))}
						</Row>
					</Flex>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Contact;
