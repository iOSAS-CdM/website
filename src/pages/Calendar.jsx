import React from 'react';
import { Flex, Typography, Calendar as AntCalendar, Badge, Row, Col, List, Image } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Title, Paragraph, Text } = Typography;

import { API_Route } from '../main';

const Calendar = () => {
	const navigate = useNavigate();
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const isMobile = useMobile();
	const [selectedValue, setSelectedValue] = React.useState(() => dayjs());

	const [announcements, setAnnouncements] = React.useState([]);

	React.useEffect(() => {
		if (!header || !header.current) return;
		const listener = () => setHeaderSize(header.current.offsetHeight);
		listener();
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [header]);

	React.useEffect(() => {
		async function fetchAnnouncements() {
			try {
				const response = await fetch(`${API_Route}/announcements`);
				if (!response.ok) {
					throw new Error('Failed to fetch announcements');
				}
				const data = await response.json();
				setAnnouncements(data.announcements);
			} catch (err) {
				console.error(err);
			};
		};

		fetchAnnouncements();
	}, []);

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto',
	};

	const getListData = (value) => {
		return announcements
			.filter(announcement => {
				const dateToCompare = announcement.type === 'event' ? announcement.event_date : announcement.created_at;
				return dayjs(dateToCompare).isSame(value, 'day');
			});
	};

	const dateCellRender = (value) => {
		const listData = getListData(value);
		return (
			<ul className='events' style={{ margin: 0, padding: 0, listStyle: 'none' }}>
				{listData.map((announcement, index) => (
					<li key={index}>
						{announcement.title}
					</li>
				))}
			</ul>
		);
	};

	const onSelect = (newValue) => {
		setSelectedValue(newValue);
	};

	const onPanelChange = (newValue) => {
		setSelectedValue(newValue);
	};

	const selectedDateEvents = getListData(selectedValue);

	return (
		<>
			<Header ref={header} activeKey='calendar' />
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
						<Title style={{ color: 'white', marginTop: 0 }}>School Calendar</Title>
						<Paragraph style={{ color: 'white', marginTop: 0 }}>
							Stay updated with the latest school events and holidays.
						</Paragraph>
					</div>
				</div>

				{/* Calendar Section */}
				<section style={sectionStyle}>
					<Row gutter={[32, 32]}>
						<Col xs={24} lg={16}>
							<AntCalendar
								cellRender={dateCellRender}
								onSelect={onSelect}
								onPanelChange={onPanelChange}
								value={selectedValue}
							/>
						</Col>
						<Col xs={24} lg={8}>
							<Title level={4}>Events for {selectedValue.format('MMMM D, YYYY')}</Title>
							<List
								bordered
								dataSource={selectedDateEvents}
								renderItem={(announcement) => (
									<List.Item onClick={() => navigate(`/announcements/${announcement.id}`)} style={{ cursor: 'pointer' }}>
										<Flex vertical align='stretch' gap={8}>
											<Image
												src={announcement.cover}
												width='100%'
												height={128}
												preview={false}
												style={{ objectFit: 'cover', borderRadius: 4 }}
												alt={announcement.title}
											/>
											<div>
												<Title level={5}>{announcement.title}</Title>
												<Text type='secondary'>{announcement.description}</Text>
											</div>
										</Flex>
									</List.Item>
								)}
								locale={{ emptyText: 'No events for this day.' }}
							/>
						</Col>
					</Row>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Calendar;
