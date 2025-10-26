import React from 'react';

import {
	Flex,
	Typography,
	Divider,
	Button,
	Image,
	Row,
	Col,
	Card,
	Form,
	Input,
	Checkbox,
	Space
} from 'antd';
import {
	BookOutlined,
	PhoneOutlined,
	CalendarOutlined,
	RightOutlined,
	MailOutlined,
	GithubOutlined
} from '@ant-design/icons';

import Header from '../components/Header';

import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;

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
			padding: `${isMobile ? 32 : 64}px`,
			boxSizing: 'border-box',

			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center'
		});
	}, [headerSize, isMobile]);

	return (
		<>
			<Header ref={header} activeKey='home' />

			<main
				style={{
					position: 'relative',
					minHeight: `calc(100vh - ${headerSize}px)`,
					paddingTop: headerSize,

					backgroundColor: 'var(--ant-color-primary)',
					...sectionStyle
				}}
			>
				<Flex
					vertical
					justify='center'
					align='center'
					gap={32}
					style={{
						position: 'relative',
						height: '100%',
						padding: isMobile ? '64px 32px' : '96px 64px',
						color: 'var(--ant-color-white)',
						zIndex: 1
					}}
				>
					<Title level={4} style={{ color: 'currentColor', margin: 0 }}>Colegio de Montalban</Title>
					<Title level={1} style={{ color: 'currentColor', margin: 0, fontSize: isMobile ? 36 : 48 }}>
						Office of Student Affairs and Services
					</Title>
					<Text style={{ color: 'currentColor', fontSize: isMobile ? 14 : 16, maxWidth: 800, textAlign: 'center' }}>
						<b>Your campus compass</b>. Guiding student welfare, development, and disciplinary matters.
					</Text>
					<Divider style={{ maxWidth: '100%', width: 256, height: 1, margin: '16px 0', backgroundColor: 'var(--ant-color-white)' }} />
					<Flex gap={16} wrap='wrap' justify='center'>
						<Button type='primary' icon={<BookOutlined />} href='/about'>About Us</Button>
						<Button type='default' icon={<PhoneOutlined />} href='/contact'>Contact Us</Button>
					</Flex>
				</Flex>

				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundImage: 'url(/Background.jpg)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						filter: 'brightness(0.3)',
						zIndex: 0
					}}
				/>
			</main>

			{/* Fostering section */}
			<section style={{ ...sectionStyle, backgroundColor: 'transparent' }}>
				<Flex vertical justify='center' align='center' gap={24} style={{ width: '100%', maxWidth: 1100 }}>
					<Title level={2}>Fostering Student Welfare & Growth</Title>

					<Row gutter={[32, 32]} align='middle' justify='center' style={{ width: '100%' }}>
						<Col xs={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
						<Image
							alt='Students'
							preview={false}
								src={''} /* leave blank if image not present in /public */
							style={{
								width: 320,
								height: 220,
								objectFit: 'cover',
								borderRadius: 12,
								backgroundColor: '#f5f5f5'
							}}
						/>
						</Col>
						<Col xs={24} md={12}>
							<Paragraph style={{ textAlign: 'left', fontSize: 16, lineHeight: 1.6 }}>
								We are the architects of a thriving campus environment, dedicated to nurturing your holistic
								well-being and fueling your academic triumphs. From fostering a safe and inclusive community
								to providing a wealth of resources, we are committed to addressing every facet of your personal,
								academic, and social journey.
							</Paragraph>

							<Paragraph style={{ textAlign: 'left', fontSize: 16, lineHeight: 1.6 }}>
								Consider us your trusted campus compass, always here to light your path, resolve any concerns,
								and seamlessly connect you with enriching opportunities. Through our innovative programs and
								passionate team, we empower you to explore, learn, and truly flourish.
							</Paragraph>

							<Button type='primary' href='/about' icon={<RightOutlined />}>
								Learn more about us
							</Button>
						</Col>
					</Row>
				</Flex>
			</section>

			{/* Latest News */}
			<section style={{ ...sectionStyle, paddingTop: 24, paddingBottom: 24 }}>
				<Flex vertical justify='center' align='center' gap={24} style={{ width: '100%', maxWidth: 1100 }}>
					<Title level={2}>Latest News & Announcements</Title>

					<Row gutter={[24, 24]} style={{ width: '100%' }}>
						<Col xs={24} md={12}>
							<Card hoverable bodyStyle={{ padding: 16 }}>
								<Row gutter={16}>
									<Col span={10}>
										<Image src={''} preview={false} alt='news' style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, backgroundColor: '#eee' }} />
									</Col>
									<Col span={14}>
										<Title level={4}>Title Defense</Title>
										<Text type='secondary' style={{ display: 'block', marginBottom: 12 }}>
											The esteemed Faculty of Colegio de Montalban, nestled within the vibrant academic
											community of computing studies, proudly announces a si...
										</Text>
										<Space>
											<Button size='small' type='text'>May 23, 2025</Button>
											<Button size='small' type='link' href='/news/title-defense'>Read More</Button>
										</Space>
									</Col>
								</Row>
							</Card>
						</Col>

						<Col xs={24} md={12}>
							<Card hoverable bodyStyle={{ padding: 16 }}>
								<Row gutter={16}>
									<Col span={10}>
										<Image src={''} preview={false} alt='news' style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, backgroundColor: '#eee' }} />
									</Col>
									<Col span={14}>
										<Title level={4}>Student Congress 2025</Title>
										<Text type='secondary' style={{ display: 'block', marginBottom: 12 }}>
											The vibrant student body of Colegio de Montalban, nestled in the heart of Rodriguez,
											Calabarzon, is thrilled to announce the highly anticipated Student Congress 2025! This premi...
										</Text>
										<Space>
											<Button size='small' type='text'>May 20, 2025</Button>
											<Button size='small' type='link' href='/news/student-congress-2025'>Read More</Button>
										</Space>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>

					<Button type='default' href='/calendar' icon={<CalendarOutlined />}>Open Calendar</Button>
				</Flex>
			</section>

			{/* Message Us */}
			<section style={{ ...sectionStyle, paddingTop: 24, paddingBottom: 24, backgroundColor: 'transparent' }}>
				<Flex vertical justify='center' align='center' gap={24} style={{ width: '100%', maxWidth: 1100 }}>
					<Row gutter={[24, 24]} style={{ width: '100%' }} align='middle'>
						<Col xs={24} md={12}>
							<Image src={''} preview={false} alt='office' style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 8, backgroundColor: '#eee' }} />
						</Col>
						<Col xs={24} md={12} style={{ textAlign: 'left' }}>
							<Flex vertical gap={16}>
								<Title level={3}>Send a Message to the System Developers</Title>
								<Text type='secondary' style={{ display: 'block', marginBottom: 16 }}>Have a question or suggestion? We'd love to hear from you.</Text>
								<Button
									type='primary'
									icon={<MailOutlined />}
									href='https://mail.google.com/mail/?view=cm&fs=1&to=danieljohnbyns@gmail.com&su=Inquiry&body=Hi%20there%2C'
									target='_blank'
									rel='noopener noreferrer'
								>
									Send via Gmail
								</Button>
							</Flex>
						</Col>
					</Row>
				</Flex>
			</section>

			<Footer />
		</>
	);
};

export default Home;