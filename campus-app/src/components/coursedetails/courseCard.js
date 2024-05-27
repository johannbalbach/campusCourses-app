import React, { useState, useEffect } from 'react';
import { Card, Nav, Button, Row, Col } from 'react-bootstrap';
import './courseCard.css'
import CreateNotificationModal from '../shared/Modals/CreateNotificationModal';

const CourseCard = ({ body, isPrivileged }) => {
    const { requirements, annotations, notifications } = body;
    const [activeTab, setActiveTab] = useState('requirements');

    const handleTabChange = (tab) => setActiveTab(tab);

    const [showCreateNotificationModal, setShowCreateNotificationModal] = useState(false);
    const handleModalClose = () => setShowCreateNotificationModal(false);
    const handleModalOpen = () => setShowCreateNotificationModal(true);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'requirements':
                return renderHtmlContent(requirements);
            case 'annotations':
                return renderHtmlContent(annotations);
            case 'notifications':
                return (
                  <div>
                    {(isPrivileged) && (
                        <Button style={{borderRadius: '0', fontSize: '0.8rem'}} variant="primary" className="mt-1 mb-1" onClick={handleModalOpen}>
                            СОЗДАТЬ УВЕДОМЛЕНИЕ
                        </Button>
                    )}
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

    const renderHtmlContent = (htmlContent) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = htmlContent;
        const images = wrapper.querySelectorAll('img');
        images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
        return <div dangerouslySetInnerHTML={{ __html: wrapper.innerHTML }} />;
    };

    return (
        <>
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

            {isPrivileged && <CreateNotificationModal showModal={showCreateNotificationModal} handleCloseModal={handleModalClose}/>}
        </>
    );
};

export default CourseCard;
