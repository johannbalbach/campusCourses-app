import React, { useState, useEffect } from 'react';
import { Card, Nav, Button, Row, Col } from 'react-bootstrap';
import './courseCard.css'

const CourseCard = ({ body }) => {
    const { requirements, annotations, notifications } = body;
    const [activeTab, setActiveTab] = useState('requirements');

    const handleTabChange = (tab) => setActiveTab(tab);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'requirements':
                return <div dangerouslySetInnerHTML={{ __html: requirements }}></div>;
            case 'annotations':
                return <div dangerouslySetInnerHTML={{ __html: annotations }}></div>;
            case 'notifications':
                return (
                  <div>
                      {notifications.map((notification, index) => (
                        <>
                          {notification.isImportant ? (
                          <div className='border-bottom border-2 mt-2 mb-2' key={index} style={{backgroundColor: '#FCCACA'}}>
                              {notification.text}
                          </div>
                         ) : (
                          <div className='border-bottom border-2 mt-2 mb-2' key={index}>
                              {notification.text}
                          </div>
                         )}
                        </> 
                      ))}
                  </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className='mt-3'>
            <Card.Header>
                <Row>
                    <Nav variant="tabs" defaultActiveKey="#requirements">
                        <Col className='ms-2'>
                            <Nav.Item>
                                <Nav.Link href="#requirements" onClick={() => handleTabChange('requirements')}>Требования к курсу</Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col>
                            <Nav.Item>
                                <Nav.Link href="#annotations" onClick={() => handleTabChange('annotations')}>Аннотация</Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col>
                            <Nav.Item>
                                <Nav.Link href="#notifications" onClick={() => handleTabChange('notifications')}>
                                    Уведомления
                                    <span className="notification-circle">{notifications.length}</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Col>
                    </Nav>
                </Row>
            </Card.Header>
            <Card.Body>
                {renderTabContent()}
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
