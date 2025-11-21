import React from 'react';
import { Flex, Typography, Row, Col, Card, Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Title, Paragraph, Text } = Typography;

const About = () => {
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
		margin: '0 auto',
		textAlign: 'center'
	};

	return (
		<>
			<Header ref={header} activeKey='about' />
			<main style={{
				paddingTop: headerSize
			}}>
				{/* Hero Section */}
				<div style={{
					position: 'relative',
					textAlign: 'center',
					color: 'white',
					padding: isMobile ? '64px 16px' : '64px 32px',
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
						<Text style={{ color: 'white', marginTop: 0 }}>About us</Text>
						<Title style={{ color: 'white', marginTop: 0 }}>Office of Student Affairs and Services</Title>
						<Paragraph style={{ color: 'white', marginTop: 0 }}>Our mission, vision, and the team dedicated to student success.</Paragraph>
					</div>
				</div>
			</main>

			<section style={sectionStyle}>
				<Title level={2}>Mandate</Title>
				<Paragraph style={{ textAlign: 'justify' }}>
					The Office of Student Affairs and Services (OSAS) is mandated to uphold the holistic development and well-being of students through the implementation of comprehensive programs and services. These include the promotion of student engagement, discipline, welfare, and leadership development, in alignment with the institutional mission and values of Colegio de Montalban.
				</Paragraph>
				<Paragraph style={{ textAlign: 'justify' }}>
					The office ensures that students are provided with opportunities to participate in extracurricular activities, community service, and leadership training. Furthermore, it enforces student discipline policies to maintain an environment conducive to learning and personal growth. OSAS is committed to empowering student leaders and fostering a responsible, service-oriented, and values-driven campus community.
				</Paragraph>
			</section>
			<section style={sectionStyle}>
				<Flex vertical={isMobile} gap={64} align='start'>
					<div style={{ width: '100%' }}>
						<Title level={2}>Mission Statement</Title>
						<Paragraph style={{ textAlign: 'center', fontStyle: 'italic' }}>
							“Our mission is to foster a supportive and inclusive learning environment that enhances the holistic development of our students. Through a wide range of programs, services, and resources, we strive to:
						</Paragraph>
						<ul style={{ listStylePosition: 'inside', textAlign: 'center', padding: 0 }}>
							<li>Cultivate personal growth and well-being through counseling, wellness programs, and extracurricular activities.</li>
							<li>Empower students with leadership skills, instilling a sense of service, and inspiring active community engagement, thus shaping them into responsible global citizens.”</li>
						</ul>
					</div>
					<div style={{ width: '100%' }}>
						<Title level={2}>Vision Statement</Title>
						<Paragraph style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.2em' }}>
							“To be the leading force in empowering students to excel academically, grow personally, and thrive in a diverse and inclusive community, preparing them for a lifetime of success and contribution to society.”
						</Paragraph>
					</div>
				</Flex>
			</section>
			<section style={sectionStyle}>
				<Title level={2}>Service Pledge</Title>
				<Paragraph style={{ textAlign: 'center' }}>
					We, the personnel of the Office of the Student Affairs and Services (OSAS) of Colegio de Montalban, wholeheartedly pledge to uphold the highest standards of service in promoting student development, welfare, and success.
				</Paragraph>
				<Paragraph>With integrity, compassion, and excellence, we commit to:</Paragraph>
				<ul style={{ listStylePosition: 'inside', textAlign: 'left', margin: '0 auto' }}>
					<li>Serve students promptly, fairly, and with respect, regardless of background or belief.</li>
					<li>Foster a safe, inclusive, and supportive environment that promotes holistic student growth and well-being.</li>
					<li>Ensure transparency and accountability in all programs, services, and transactions.</li>
					<li>Listen actively and respond constructively to student needs, concerns, and feedback.</li>
					<li>Promote leadership, civic engagement, and personal responsibility among the student body.</li>
					<li>Collaborate with faculty, staff, and stakeholders to create a positive and empowering campus experience.</li>
					<li>Continuously improve our services, guided by feedback, data, and best practices.</li>
				</ul>
				<Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
					We are committed to being partners in your journey as scholars, leaders, and responsible citizens.
				</Paragraph>
				<Paragraph strong style={{ textAlign: 'center' }}>Your success is our mission.</Paragraph>
				<Paragraph strong style={{ textAlign: 'center' }}>Mabuhay ang mga Iskolar ng Bayan!</Paragraph>
			</section>

			{/* Our Team Section */}
			<section style={sectionStyle}>
				<Flex vertical gap={64}>
					<Image src='/Organization Chart.png' alt='Organization Chart' />
				</Flex>
			</section>

			<Footer />
		</>
	);
};

export default About;
