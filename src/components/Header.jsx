import { Flex, Tabs, Image, Button } from 'antd';

import { DownloadOutlined } from '@ant-design/icons';

/**
 * @type {React.FC<{ activeKey: 'home' | 'about' | 'forms' | 'calendar' | 'organizations' | 'contact' }>}>}
 */
const Header = (props) => {
	const { activeKey, ref } = props;
	return (
		<Flex
			ref={ref}
			justify='space-between'
			align='center'
			gap={32}
			style={{
				padding: '16px 32px'
			}}
		>
			<Image
				src='/Logo.png'
				preview={false}
				alt='Logo'
				style={{
					height: 64
				}}
			/>

			<Flex gap={32} align='center'>
				<Tabs
					activeKey={activeKey}
					items={[
						{
							label: 'Home',
							key: 'home'
						},
						{
							label: 'About',
							key: 'about'
						},
						{
							label: 'Forms',
							key: 'forms'
						},
						{
							label: 'Calendar',
							key: 'calendar'
						},
						{
							label: 'Organizations',
							key: 'organizations'
						},
						{
							label: 'Contact',
							key: 'contact'
						}
					]}
				/>
				<Button
					type='primary'
					icon={<DownloadOutlined />}
				>
					Get the App
				</Button>
			</Flex>
		</Flex>
	);
};

export default Header;