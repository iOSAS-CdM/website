import React from 'react';
import { Flex, Typography, Divider, Button, Image, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useMobile } from '../contexts/Mobile';

const { Text, Title } = Typography;

const Footer = () => {
	const isMobile = useMobile();

	return (
		<footer style={{
			backgroundImage: 'url(/Background.jpg)',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			padding: isMobile ? '32px 16px' : '48px 32px',
			marginTop: 32,
			position: 'relative'
		}}>
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				backdropFilter: 'blur(3px)',
				zIndex: 0
			}} />
			<div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
				<Row gutter={[32, 32]} align='top' justify='space-between'>
					<Col xs={24} md={8}>
						<Flex vertical align='flex-start' gap={16}>
							<Image src={'/CDM Logo.png'} preview={false} alt='logo' style={{ height: 80, objectFit: 'contain', mixBlendMode: 'lighten' }} />
							<Title level={4} style={{ color: 'var(--ant-color-white)', margin: 0 }}>Office of Student Affairs and Services</Title>
							<Text style={{ color: 'var(--ant-color-white)', textAlign: 'left' }}>Your campus compass. Guiding student welfare, development, and disciplinary matters.</Text>
						</Flex>
					</Col>

					<Col xs={24} sm={12} md={4}>
						<Title level={5} style={{ color: 'var(--ant-color-white)' }}>Sitemap</Title>
						<Flex vertical align='flex-start' gap={8}>
							<Typography.Link href='/' style={{ color: 'var(--ant-color-white)' }}>Home</Typography.Link>
							<Typography.Link href='/about' style={{ color: 'var(--ant-color-white)' }}>About</Typography.Link>
							<Typography.Link href='/forms' style={{ color: 'var(--ant-color-white)' }}>Forms</Typography.Link>
							<Typography.Link href='/calendar' style={{ color: 'var(--ant-color-white)' }}>Calendar</Typography.Link>
							<Typography.Link href='/organizations' style={{ color: 'var(--ant-color-white)' }}>Organizations</Typography.Link>
							<Typography.Link href='/contact' style={{ color: 'var(--ant-color-white)' }}>Contact</Typography.Link>
						</Flex>
					</Col>

					<Col xs={24} sm={12} md={6}>
						<Flex vertical align='flex-start' gap={16}>
							<Title level={5} style={{ color: 'var(--ant-color-white)' }}>Get the App</Title>
							<div>
								<Button
									ghost
									href='https://github.com/iOSAS-CdM/mobile'
									target='_blank'
									rel='noopener noreferrer'
									icon={<GithubOutlined />}
								>
									Students
								</Button>
							</div>
							<div>
								<Button
									ghost
									href='https://github.com/iOSAS-CdM/administrative-staff'
									target='_blank'
									rel='noopener noreferrer'
									icon={<GithubOutlined />}
								>
									For Administrative Staff
								</Button>
							</div>
						</Flex>
					</Col>
				</Row>

				<Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '32px 0' }} />

				<Text style={{ color: 'var(--ant-color-white)', textAlign: 'center', display: 'block' }}>
					© Colegio de Montalban Office of Student Affairs and Services 2025
				</Text>
			</div>
		</footer>
	);
};

export default Footer;
