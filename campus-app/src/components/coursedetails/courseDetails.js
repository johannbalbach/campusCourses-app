import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const CourseDetails = ({ course }) => {
    const [userRole, setUserRole] = useState('admin');
    const { id, name, startYear, semester, maximumStudentsCount, remainingSlotsCount, studentsInQueueCount, status } = course;
    const statusColor = {
        Started: 'green',
        OpenForAssigning: 'blue',
        Finished: 'red',
        Created: 'grey'
    };

    return (
        <>
        <Card className="" style={{borderRadius: '0', backgroundColor: '#f8f9fa'}}>
            <Card.Body>
            <Row className="">
                    <Col className='col-sm-8 mt-auto mb-auto'>
                        <h5>{name}</h5>
                    </Col>
                    <Col className='col-sm-4'>
                        {userRole === 'admin' && (
                            <Button style={{borderRadius: '0'}} variant="warning" className="float-end">
                                Изменить
                            </Button>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card style={{borderRadius: '0'}}>
            <Card.Body>
                <Row className="mb-3">
                    <Col>
                        <h6>Статус курса:</h6>
                        <span style={{ color: statusColor[status] }}>{status}</span>
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
        </>
    );
};

export default CourseDetails;