import React, { useState, useEffect, useRef } from 'react';
import { Flex, Typography, Card, Row, Col, Spin, Alert, Segmented } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMobile } from '../contexts/Mobile';
import { API_Route } from '../main';

const { Title, Paragraph } = Typography;

const Organizations = () => {
  const header = useRef(null);
  const [headerSize, setHeaderSize] = useState(0);
  const isMobile = useMobile();
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!header || !header.current) return;
    const listener = () => setHeaderSize(header.current.offsetHeight);
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [header]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        let url = `${API_Route}/organizations`;
        if (filter !== 'all') {
          url += `?type=${filter}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch organizations');
        }
        const data = await response.json();
        setOrganizations(data.organizations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [filter]);

  const sectionStyle = {
    padding: isMobile ? '32px' : '64px',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
  };

  return (
    <>
      <Header ref={header} activeKey="organizations" />
      <main style={{ paddingTop: headerSize }}>
        <section style={sectionStyle}>
          <Flex vertical align="center" gap={32}>
            <Title level={2}>Student Organizations</Title>
            <Segmented
              options={[
                { label: 'All', value: 'all' },
                { label: 'College-Wide', value: 'college-wide' },
                { label: 'Institute-Wide', value: 'institute-wide' },
              ]}
              value={filter}
              onChange={setFilter}
            />
            {loading ? (
              <Spin size="large" />
            ) : error ? (
              <Alert message="Error" description={error} type="error" showIcon />
            ) : (
              <Row gutter={[32, 32]} style={{ width: '100%' }}>
                {organizations.map((org) => (
                  <Col key={org.id} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      cover={<img alt={org.shortName} src={org.cover} style={{ height: 150, objectFit: 'cover' }} />}
                      onClick={() => navigate(`/organizations/${org.id}`)}
                    >
                      <Card.Meta
                        avatar={<img src={org.logo} alt={`${org.shortName} logo`} style={{ width: 48, height: 48, borderRadius: '50%' }} />}
                        title={org.shortName}
                        description={org.fullName}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Flex>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Organizations;
