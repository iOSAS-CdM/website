import React from 'react';

import { Flex, Typography, Card, Image, Row, Col } from 'antd';
import { BookOutlined, PhoneOutlined } from '@ant-design/icons';

import Header from '../components/Header';

import { useMobile } from '../contexts/Mobile';

const { Text, Title } = Typography;

const Forms = () => {
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

	const [randomSeeds] = React.useState(() => [
		Math.floor(Math.random() * 1e6),
		Math.floor(Math.random() * 1e6)
	]);

	const img1 = `https://picsum.photos/seed/${randomSeeds[0]}/800/400`;
	const img2 = `https://picsum.photos/seed/${randomSeeds[1]}/800/400`;

	return (
		<>
			<Header ref={header} activeKey='forms' />

			<section style={{ ...sectionStyle }}>
				<Flex vertical justify='center' align='center' gap={32}>
					<Title level={2}>Forms</Title>

					<Row gutter={[16, 16]} justify='center'>
						<Col xs={24} sm={12} md={8}>
							<Card
								title='Form 1'
								cover={
									<Image
										src={img1}
										alt='Random Preview 1'
										preview={false}
										style={{
											objectFit: 'cover',
											height: 256
										}}
									/>
								}
							>
							</Card>
						</Col>

						<Col xs={24} sm={12} md={8}>
							<Card
								title='Form 2'
								cover={
									<Image
										src={img2}
										alt='Random Preview 2'
										preview={false}
										style={{
											objectFit: 'cover',
											height: 256
										}}
									/>
								}
							>
							</Card>
						</Col>
					</Row>

					<Text type='secondary' italic>Click to download the forms.</Text>
				</Flex>
			</section>
		</>
	);
};

export default Forms;