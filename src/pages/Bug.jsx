import React from 'react';
import { App, Flex, Typography, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

const { Text, Title, Paragraph } = Typography;

const Bug = () => {
	const header = React.useRef(null);
	const [headerSize, setHeaderSize] = React.useState(0);
	const isMobile = useMobile();
	const { modal: Modal } = App.useApp();

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

	const sectionStyle = {
		padding: isMobile ? '32px' : '64px',
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: 1200,
		margin: '0 auto',
		textAlign: 'center'
	};

	const [form] = Form.useForm();

	const normFile = (e) => {
		if (Array.isArray(e))
			return e;
		return e && e.fileList;
	};

	const onFinish = async (values) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('email', values.email);
		formData.append('description', values.description);
		if (values.screenshots)
			for (const file of values.screenshots)
				formData.append('screenshots', file.originFileObj);

		const response = await fetch(`${API_Route}/bugs`, {
			method: 'POST',
			body: formData
		});

		if (!response?.ok) {
			Modal.error({
				title: 'Submission Failed',
				content: 'There was an error submitting your bug report. Please try again later.'
			});
			return;
		};

		Modal.success({
			title: 'Bug Report Submitted',
			content: 'Thank you for reporting the bug! We will look into it as soon as possible.'
		});
		form.resetFields();
	};

	return (
		<>
			<Header ref={header} activeKey='' />

			<main style={{ marginTop: headerSize }}>
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
						<Title style={{ color: 'white', marginTop: 0 }}>Report a Bug</Title>
						<Paragraph style={{ color: 'white', marginTop: 0 }}>
							Help us improve by reporting any bugs or issues you encounter while using our system.
						</Paragraph>
					</div>
				</div>
			</main>

			<section style={{
				textAlign: 'left',
				...sectionStyle
			}}>
				<Form
					form={form}
					layout='vertical'
					onFinish={onFinish}
				>
					<Form.Item
						name='name'
						label='Name'
						rules={[{ required: true, message: 'Please enter your name' }]}
					>
						<Input placeholder='Your Name' />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='description'
						label='Bug Description'
						rules={[{ required: true, message: 'Please describe the bug' }]}
					>
						<Input.TextArea rows={4} placeholder='Describe the issue you encountered' />
					</Form.Item>
					<Form.Item
						name='screenshots'
						label='Upload Screenshots (optional)'
						valuePropName='fileList'
						getValueFromEvent={normFile}
					>
						<Upload.Dragger name='files' action={() => false} multiple listType='picture-card'>
							<p className='ant-upload-drag-icon'>
								<UploadOutlined />
							</p>
							<p className='ant-upload-text'>Click or drag files to this area to upload</p>
							<p className='ant-upload-hint'>Support for a single or bulk upload. Strictly prohibit from uploading company data or other banned files.</p>
						</Upload.Dragger>
					</Form.Item>
					<Flex>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Submit Bug Report
							</Button>
						</Form.Item>
					</Flex>
				</Form>
			</section>

			<Footer />
		</>
	);
};

export default Bug;