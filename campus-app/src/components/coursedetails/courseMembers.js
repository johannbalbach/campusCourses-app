import React, { useState } from 'react';
import { Card, Nav, Row, Col, Button, Modal } from 'react-bootstrap';
import CourseMember from './courseMember';

const CourseMembers = ({ members}) => {
    const { teachers, students } = members;
    const [activeTab, setActiveTab] = useState('teachers');
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [userType, setUserType] = useState('teacher');

    const handleTabChange = (tab) => setActiveTab(tab);

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setShowModal(false);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'teachers':
                return (
                    <>
                        {teachers.map((teacher, index) => (
                            <CourseMember key={index} body={teacher} memberType="teacher" />
                        ))}
                    </>
                );
            case 'students':    
                return (
                    <>
                        {students.map((student, index) => (
                            <div key={index}>
                                <CourseMember body={student} memberType="student" userRole={"teacher"} />
                                {userType === 'teacher' && student.status === 'pending' && (
                                    <Button variant="success" onClick={() => handleSelectStudent(student)}>
                                        Принять в группу
                                    </Button>
                                )}
                                {/* Add other logic for different user types and student statuses */}
                            </div>
                        ))}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card className='mt-3'>
            <Card.Header>
                <Row>
                    <Nav variant="tabs" defaultActiveKey="#teachers">
                        <Col className='ms-2'>
                            <Nav.Item>
                                <Nav.Link href="#teachers" onClick={() => handleTabChange('teachers')}>Преподаватели</Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col>
                            <Nav.Item>
                                <Nav.Link href="#students" onClick={() => handleTabChange('students')}>Студенты</Nav.Link>
                            </Nav.Item>
                        </Col>
                    </Nav>
                </Row>
            </Card.Header>
            <Card.Body>
                {renderTabContent()}
            </Card.Body>
            <Modal show={showModal} onHide={handleCloseModal}>
                {/* Modal content for editing student grade */}
            </Modal>
        </Card>
    );
};

export default CourseMembers;
