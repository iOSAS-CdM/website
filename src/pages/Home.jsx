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
	Space,
	Skeleton
} from 'antd';
import {
	BookOutlined,
	PhoneOutlined,
	CalendarOutlined,
	RightOutlined,
	MailOutlined,
	GithubOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import Header from '../components/Header';
import { API_Route } from '../main';

import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;

const Home = () => {
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const [announcements, setAnnouncements] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const response = await fetch(`${API_Route}/announcements/latest`);
				if (!response.ok) {
					throw new Error('Failed to fetch announcements');
				}
				const data = await response.json();
				setAnnouncements(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchAnnouncements();
	}, []);

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
									src='/Students.png'
								style={{
									width: '100%',
									height: 512,
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

					<Row gutter={[24, 24]} style={{ width: '100%', textAlign: 'left' }}>
						{loading ? (
							Array.from({ length: 2 }).map((_, index) => (
								<Col xs={24} md={12} key={index}>
									<Card>
										<Skeleton active />
									</Card>
								</Col>
							))
						) : (
							announcements.map((announcement) => (
								<Col xs={24} md={12} key={announcement.id}>
									<Card
										hoverable
										style={{ height: '100%' }}
										cover={
											<Image
												alt={announcement.title}
												src={announcement.cover || '/AnnouncementPlaceholder.png'}
												preview={false}
												style={{ width: '100%', height: 200, objectFit: 'cover' }}
											/>
										}
									>
										<Title level={4}>{announcement.title}</Title>
										<Text type='secondary' style={{ display: 'block', marginBottom: 12 }}>
											{announcement.content.substring(0, 100)}...
										</Text>
										<Space>
											{dayjs(announcement.created_at).format('MMM D, YYYY')}
											<Button size='small' type='link' href={`/announcements/${announcement.id}`}>Read More</Button>
										</Space>
									</Card>
								</Col>
							))
						)}
					</Row>

					<Button type='default' href='/calendar' icon={<CalendarOutlined />}>Open Calendar</Button>
				</Flex>
			</section>

			{/* Message Us */}
			<section style={{ ...sectionStyle, paddingTop: 24, paddingBottom: 24, backgroundColor: 'transparent' }}>
				<Flex vertical justify='center' align='center' gap={24} style={{ width: '100%', maxWidth: 1100 }}>
					<Row gutter={[32, 32]} style={{ width: '100%' }} align='middle'>
						<Col xs={24} md={12}>
							<Image src='/Developers.jpg' preview={false} alt='office' style={{ width: '100%', height: 266, borderRadius: 12, objectFit: 'cover' }} />
						</Col>
						<Col xs={24} md={12} style={{ textAlign: 'left' }}>
							<Flex vertical gap={16}>
								<Title level={3}>Send a Message to the System Developers</Title>
								<Text type='secondary' style={{ display: 'block', marginBottom: 16 }}>Have a question or suggestion? We'd love to hear from you.</Text>
								<span><Button
									type='primary'
									icon={<MailOutlined />}
									href='https://mail.google.com/mail/?view=cm&fs=1&to=danieljohnbyns@gmail.com&su=Inquiry&body=Hi%20there%2C'
									target='_blank'
									rel='noopener noreferrer'
								>
									Send via Gmail
								</Button></span>
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