import React from 'react';
import { Flex, Typography, Calendar as AntCalendar, Badge, Row, Col, List } from 'antd';
import dayjs from 'dayjs';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';

const { Title, Paragraph, Text } = Typography;

const Calendar = () => {
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const isMobile = useMobile();
	const [selectedValue, setSelectedValue] = React.useState(() => dayjs());

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

	const events = {
		'2025-11-05': [{ type: 'success', content: 'Midterm Examinations' }],
		'2025-11-15': [{ type: 'warning', content: 'University-wide Sports Fest' }],
		'2025-11-20': [{ type: 'error', content: 'Deadline for Project Submissions' }],
		'2025-12-01': [{ type: 'success', content: 'Start of Christmas Break' }],
		'2025-12-25': [{ type: 'default', content: 'Christmas Day' }],
	};

	const getListData = (value) => {
		return events[value.format('YYYY-MM-DD')] || [];
	};

	const dateCellRender = (value) => {
		const listData = getListData(value);
		return (
			<ul className="events" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
				{listData.map((item, index) => (
					<li key={index}>
						<Badge status={item.type} text={item.content} />
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
								dateCellRender={dateCellRender}
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
								renderItem={(item) => (
									<List.Item>
										<Badge status={item.type} text={item.content} />
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
