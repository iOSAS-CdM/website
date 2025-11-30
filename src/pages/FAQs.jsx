import React, { useEffect, useRef, useState } from 'react';
import { Typography, Empty, Spin, Alert } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

const { Title, Paragraph } = Typography;

const FAQs = () => {
	const header = useRef(null);
	const [headerSize, setHeaderSize] = useState(0);
	const isMobile = useMobile();
	const [faqs, setFaqs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
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
		async function fetchFaqs() {
			try {
				const response = await fetch(`${API_Route}/faqs`);
				if (!response.ok) throw new Error('Failed to fetch FAQs');
				const data = await response.json();
				setFaqs(data.faqs || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchFaqs();
	}, []);

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
			<Header ref={header} activeKey='faqs' />
			<main style={{ marginTop: headerSize }}>
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
						background: 'rgba(0,0,0,0.5)'
					}} />
					<div style={{ position: 'relative', zIndex: 1 }}>
						<Title style={{ color: 'white', marginBottom: 0 }}>Frequently Asked Questions</Title>
						<Paragraph style={{ color: 'white', fontSize: 18 }}>Find answers to common questions about OSAS and the system.</Paragraph>
					</div>
				</div>
			</main>

			<section style={sectionStyle}>
				{loading ? <Spin size='large' /> : error ? <Alert type='error' message={error} /> : faqs.length === 0 ? <Empty description='No FAQs available at the moment.' /> : faqs.map((faq, idx) => (
					<div key={faq.id || idx} style={{ marginBottom: 32, textAlign: 'left', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: 24 }}>
						<Title level={4} style={{ marginBottom: 8 }}>{faq.question}</Title>
						<Paragraph>{faq.answer}</Paragraph>
					</div>
				))}
			</section>
			<Footer />
		</>
	);
};

export default FAQs;
