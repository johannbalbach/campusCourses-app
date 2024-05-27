import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import EditStatusModal from '../shared/Modals/EditStatusModal';
import coursesApi from '../../api/coursesApi';
import myCoursesApi from '../../api/myCoursesApi';

const CourseDetails = ({ course, isPrivileged, IsSubscribed}) => {
    const { id, name, startYear, semester, maximumStudentsCount, remainingSlotsCount, studentsInQueueCount, status } = course;
    const statusColor = {
        Started: 'green',
        OpenForAssigning: 'blue',
        Finished: 'red',
        Created: 'grey'
    };

    const [showEditStatusModal, setShowEditStatusModal] = useState(false);
    const handleModalClose = () => setShowEditStatusModal(false);
    const handleModalOpen = () => setShowEditStatusModal(true);

    const handleAssignment = async () => {
        await coursesApi.signUpForCourse(id);
    }
    return (
        <>
        <Card className="" style={{borderRadius: '0', backgroundColor: '#f8f9fa'}}>
            <Card.Body>
                <Row className="">
                    <h5>{name}</h5>
                </Row>
            </Card.Body>
        </Card>
        <Card style={{borderRadius: '0'}}>
            <Card.Body>
                <Row className="mb-3">
                    <Col className='col-sm-8 mt-auto mb-auto'>
                        <h6>Статус курса:</h6>
                        <span style={{ color: statusColor[status] }}>{status}</span>
                    </Col>
                    <Col className='col-sm-4'>
                        {isPrivileged && (
                            <Button style={{borderRadius: '0'}} variant="warning" className="float-end" onClick={handleModalOpen}>
                                ИЗМЕНИТЬ
                            </Button>
                        )}
                        {!isPrivileged && status == 'OpenForAssigning' && ( IsSubscribed ? (
                                <Button style={{borderRadius: '0'}} variant="outline-primary" className="float-end" onClick={handleAssignment} disabled>
                                Записаться на курс
                                </Button> 
                            ) : (
                                <Button style={{borderRadius: '0'}} variant="primary" className="float-end" onClick={handleAssignment}>
                                Записаться на курс
                                </Button>
                            )
 
                        )}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={6} sm={3}>
                        <h6>Учебный год:</h6>
                        <span>{startYear}-{startYear + 1}</span>
                    </Col>
                    <Col xs={6} sm={3}>
                        <h6>Семестр:</h6>
                        <span>{semester}</span>
                    </Col>
                    <Col xs={6} sm={3}>
                        <h6>Всего мест:</h6>
                        <span>{maximumStudentsCount || 0}</span>
                    </Col>
                    <Col xs={6} sm={3}>
                        <h6>Студентов зачислено:</h6>
                        <span>{remainingSlotsCount || 0}</span>
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <h6>Заявок на рассмотрении:</h6>
                        <span>{studentsInQueueCount || 0}</span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        {isPrivileged && <EditStatusModal data={course} showModal={showEditStatusModal} handleCloseModal={handleModalClose}/>}
        </>
    );
};

export default CourseDetails;