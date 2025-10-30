import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Image, Typography, Spin, Alert, Flex, Divider, Avatar } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import MarkdownPreview from '@uiw/react-markdown-preview';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

import '../styles/Markdown.css';

const { Title, Paragraph, Text } = Typography;


const Announcement = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const isMobile = useMobile();

	const [announcement, setAnnouncement] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	React.useEffect(() => {
		if (!header || !header.current) return;
		const listener = () => setHeaderSize(header.current.offsetHeight);
		listener();
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [header]);

	useEffect(() => {
		const fetchAnnouncement = async () => {
			try {
				const response = await fetch(`${API_Route}/announcements`);
				if (!response.ok)
					throw new Error('Failed to fetch announcements');
				const data = await response.json();
				const foundAnnouncement = data.announcements.find(a => a.id == id);
				if (!foundAnnouncement)
					throw new Error('Announcement not found');
				setAnnouncement(foundAnnouncement);
				document.title = `${foundAnnouncement.title} - iOSAS`;
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			};
		};

		fetchAnnouncement();
	}, [id]);

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto'
	};

	if (loading) {
		return (
			<>
				<Header ref={header} activeKey='announcements' />
				<main style={{ paddingTop: headerSize + 128, textAlign: 'center', padding: '64px' }}>
					<Spin size='large' />
				</main>
				<Footer />
			</>
		);
	};

	if (error) {
		return (
			<>
				<Header ref={header} activeKey='announcements' />
				<main style={{ paddingTop: headerSize + 128, padding: '64px' }}>
					<Alert message='Error' description={error} type='error' showIcon />
				</main>
				<Footer />
			</>
		);
	};

	return (
		<>
			<Header ref={header} activeKey='announcements' />
			<main style={{ paddingTop: headerSize }}>
				{/* Announcement Detail Section */}
				<section style={sectionStyle}>
					<Flex vertical align='stretch' gap={32}>
						<Image
							src={announcement.cover}
							alt={announcement.title}
							style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8 }}
							preview={true}
						/>
						<Title level={2}>{announcement.title}</Title>
						<Divider />
						<MarkdownPreview
							source={announcement.content}
							wrapperElement={{
								'data-color-mode': 'light'
							}}
						/>
						<Divider />
						<Flex justify='space-between' align='center'>
							<Flex align='center' gap={16}>
								<Avatar src={announcement.author.profilePicture} alt={announcement.author.name.first} size={32} />
								<Text strong>{`${announcement.author.name.first} ${announcement.author.name.last}`}</Text>
							</Flex>
							<Text type='secondary'>{dayjs(announcement.date).format('MMMM D, YYYY')}</Text>
						</Flex>

						<Flex align='center' gap={16}>
							<Text type='secondary' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}> <ArrowLeftOutlined /> Go back</Text>
						</Flex>
					</Flex>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Announcement;