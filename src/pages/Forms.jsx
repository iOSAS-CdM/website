import React from 'react';
import { Flex, Typography, Card, Row, Col, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Title, Paragraph } = Typography;

const Forms = () => {
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
		textAlign: 'center'
	};

	const forms = [
		{ title: 'Application for Leave of Absence', description: 'For students who need to take a leave from their studies.', link: '#' },
		{ title: 'Request for Official Documents', description: 'Transcript of Records, Certifications, etc.', link: '#' },
		{ title: 'Student Grievance Form', description: 'For filing a formal complaint or grievance.', link: '#' },
		{ title: 'Scholarship Application Form', description: 'Apply for available scholarships.', link: '#' },
		{ title: 'Application for Shifting/Transfer', description: 'For students who wish to shift to another program or transfer.', link: '#' },
		{ title: 'Completion/Removal Form', description: 'For completing incomplete grades or removing failing marks.', link: '#' },
	];

	return (
		<>
			<Header ref={header} activeKey='forms' />
			<main style={{ paddingTop: headerSize }}>
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
				<section style={sectionStyle}>
					<Row gutter={[32, 32]} justify="center">
						{forms.map((form, index) => (
							<Col key={index} xs={24} sm={12} md={8}>
								<Card
									title={form.title}
									style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
									bodyStyle={{ flex: 1 }}
								>
									<Flex vertical justify="space-between" style={{ height: '100%' }}>
										<Paragraph>{form.description}</Paragraph>
										<Button
											type="primary"
											icon={<DownloadOutlined />}
											href={form.link}
											download
										>
											Download
										</Button>
									</Flex>
								</Card>
							</Col>
						))}
					</Row>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Forms;
