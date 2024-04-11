import React, { useState } from 'react';
import { Card, Nav, Row, Col, Button, Modal } from 'react-bootstrap';
import CourseMember from './courseMember';
import AddTeacherModal from './Modals/AddTeacherModal';

const CourseMembers = ({ members, isPrivileged, IsSubscribed}) => {
    const { teachers, students } = members;
    const [activeTab, setActiveTab] = useState('teachers');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleTabChange = (tab) => setActiveTab(tab);

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
    };

    const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
    const handleModalClose = () => setShowAddTeacherModal(false);
    const handleModalOpen = () => setShowAddTeacherModal(true);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'teachers':
                return (
                    <>
                        {(isPrivileged) && (
                            <Button style={{borderRadius: '0', fontSize: '0.8rem'}} variant="primary" className="mt-1 mb-1" onClick={handleModalOpen}>
                                ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ
                            </Button>
                        )}
                        {teachers.map((teacher, index) => (
                            <CourseMember key={index} body={teacher} memberType="teacher" isPrivileged={isPrivileged} IsSubscribed={IsSubscribed} />
                        ))}
                    </>
                );
            case 'students':    
                return (
                    <>
                        {students.map((student, index) => (
                            <div key={index}>
                                <CourseMember body={student} memberType="student" isPrivileged={isPrivileged} IsSubscribed={IsSubscribed}/>
                            </div>
                        ))}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
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
            </Card>

            {isPrivileged && <AddTeacherModal showModal={showAddTeacherModal} handleCloseModal={handleModalClose}/>}
        </>

    );
};

export default CourseMembers;
