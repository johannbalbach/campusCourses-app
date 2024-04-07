import React, { useState, useEffect } from 'react';
import { Card, Nav, Button } from 'react-bootstrap';

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
                          <div className='border-bottom mt-1 mb-1' key={index} style={{backgroundColor: '#FCCACA'}}>
                              {notification.text}
                          </div>
                         ) : (
                          <div className='border-bottom mt-1 mb-1' key={index}>
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
                <Nav variant="tabs" defaultActiveKey="#requirements">
                    <Nav.Item>
                        <Nav.Link href="#requirements" onClick={() => handleTabChange('requirements')}>Требования к курсу</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#annotations" onClick={() => handleTabChange('annotations')}>Аннотация</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#notifications" onClick={() => handleTabChange('notifications')}>
                            Уведомления ({notifications.length})
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                {renderTabContent()}
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
