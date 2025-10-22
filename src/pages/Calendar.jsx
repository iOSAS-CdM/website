import React from 'react';

import { Flex, Typography, Divider, Button, Image, Calendar as AntCalendar } from 'antd';
import { BookOutlined, PhoneOutlined } from '@ant-design/icons';

import Header from '../components/Header';

import { useMobile } from '../contexts/Mobile';

const { Text, Title } = Typography;

const Calendar = () => {
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
			<Header ref={header} activeKey='calendar' />

			<section style={{ ...sectionStyle }}>
				<Flex vertical justify='center' align='center' gap={32}>
					<Title level={2}>Calendar</Title>

					<AntCalendar />
				</Flex>
			</section>
		</>
	);
};

export default Calendar;