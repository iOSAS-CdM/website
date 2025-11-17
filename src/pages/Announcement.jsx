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
		window.addEventListener('scroll', listener);
		return () => {
			window.removeEventListener('resize', listener);
			window.removeEventListener('scroll', listener);
		};
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

				// Update page title
				document.title = `${foundAnnouncement.title} | OSAS - Colegio de Montalban`;

				// Update meta description
				const metaDescription = document.querySelector('meta[name="description"]');
				const excerpt = foundAnnouncement.content.substring(0, 155).replace(/[#*`]/g, '');
				if (metaDescription)
					metaDescription.setAttribute('content', excerpt);

				// Update Open Graph tags
				const ogTitle = document.querySelector('meta[property="og:title"]');
				if (ogTitle) ogTitle.setAttribute('content', `${foundAnnouncement.title} | OSAS`);

				const ogDescription = document.querySelector('meta[property="og:description"]');
				if (ogDescription) ogDescription.setAttribute('content', excerpt);

				const ogImage = document.querySelector('meta[property="og:image"]');
				if (ogImage && foundAnnouncement.cover)
					ogImage.setAttribute('content', foundAnnouncement.cover);

				const ogUrl = document.querySelector('meta[property="og:url"]');
				if (ogUrl) ogUrl.setAttribute('content', `https://iosas.online/announcements/${id}`);

				// Update Twitter Card tags
				const twitterTitle = document.querySelector('meta[property="twitter:title"]');
				if (twitterTitle) twitterTitle.setAttribute('content', `${foundAnnouncement.title} | OSAS`);

				const twitterDescription = document.querySelector('meta[property="twitter:description"]');
				if (twitterDescription) twitterDescription.setAttribute('content', excerpt);

				const twitterImage = document.querySelector('meta[property="twitter:image"]');
				if (twitterImage && foundAnnouncement.cover)
					twitterImage.setAttribute('content', foundAnnouncement.cover);

				// Update canonical URL
				let canonical = document.querySelector('link[rel="canonical"]');
				if (canonical) {
					canonical.setAttribute('href', `https://iosas.online/announcements/${id}`);
				} else {
					canonical = document.createElement('link');
					canonical.setAttribute('rel', 'canonical');
					canonical.setAttribute('href', `https://iosas.online/announcements/${id}`);
					document.head.appendChild(canonical);
				};

			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			};
		};

		fetchAnnouncement();

		// Cleanup function to reset metadata when leaving the page
		return () => {
			document.title = 'Office of Student Affairs and Services | Colegio de Montalban';

			const metaDescription = document.querySelector('meta[name="description"]');
			if (metaDescription)
				metaDescription.setAttribute('content', 'Your campus compass. OSAS at Colegio de Montalban provides comprehensive student welfare, development programs, guidance counseling, student organizations, downloadable forms, and campus announcements. Fostering holistic development and student success.');

			const ogTitle = document.querySelector('meta[property="og:title"]');
			if (ogTitle) ogTitle.setAttribute('content', 'Office of Student Affairs and Services | Colegio de Montalban');

			const ogDescription = document.querySelector('meta[property="og:description"]');
			if (ogDescription)
				ogDescription.setAttribute('content', 'Your campus compass. OSAS at Colegio de Montalban provides comprehensive student welfare, development programs, guidance counseling, student organizations, downloadable forms, and campus announcements. Fostering holistic development and student success.');

			const ogImage = document.querySelector('meta[property="og:image"]');
			if (ogImage) ogImage.setAttribute('content', '/CdM-OSAS Banner.png');

			const ogUrl = document.querySelector('meta[property="og:url"]');
			if (ogUrl) ogUrl.setAttribute('content', 'https://iosas.online/');

			const twitterTitle = document.querySelector('meta[property="twitter:title"]');
			if (twitterTitle) twitterTitle.setAttribute('content', 'Office of Student Affairs and Services | Colegio de Montalban');

			const twitterDescription = document.querySelector('meta[property="twitter:description"]');
			if (twitterDescription)
				twitterDescription.setAttribute('content', 'Your campus compass. OSAS at Colegio de Montalban provides comprehensive student welfare, development programs, guidance counseling, student organizations, downloadable forms, and campus announcements. Fostering holistic development and student success.');

			const twitterImage = document.querySelector('meta[property="twitter:image"]');
			if (twitterImage) twitterImage.setAttribute('content', '/CdM-OSAS Banner.png');

			const canonical = document.querySelector('link[rel="canonical"]');
			if (canonical) canonical.setAttribute('href', 'https://iosas.online/');
		};
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
								<Avatar size={64} shape='square' src={announcement.author.profilePicture + `?random=${Math.random()}`} alt={announcement.author.name.first} />
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