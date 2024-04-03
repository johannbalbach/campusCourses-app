import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import groupsApi from '../../api/groupsApi';
import { GroupContext } from '../groups/groupContext';

const CoursesList = () => {
    const location = useLocation();
    const [courses, setCourses] = useState([]);
    const { id } = useParams();
    const groupName = location.state ? location.state.groupName : 'nothing';

    useEffect(() => {
        const fetchData = async () => {
            const data = await groupsApi.GetGroupCourses(id);
            setCourses(data);
        };
        fetchData();
    }, [id, location.state]);

    const renderCourseCard = (course) => {
        const { id, name, startYear, semester, maximumStudentsCount, remainingSlotsCount, status } = course;
        const statusColor = {
            Started: 'green',
            OpenForAssigning: 'blue',
            Finished: 'red',
            Created: 'grey'
        };

        return (
            <Row key={id} className='mt-2'>
                <Col key={id} className='align-items-start justify-content-start'>
                    <Card>
                        <Card.Body>
                            <Card.Text style={{ fontSize: '1rem' }}>
                                <Row className=''>
                                    <div className='col-9'>
                                        <h5 style={{ fontSize: '1.3rem' }}>{name}</h5>
                                    </div>
                                    <div className='col-3 justify-content-end align-items-end d-flex mb-auto'>
                                        <span style={{ color: statusColor[status] }}>{status}</span>
                                    </div>
                                </Row>
                                <span>Учебный год - </span>{startYear}-{startYear + 1}
                                <br />
                                <span>Семестр - </span>{semester}
                                <br />
                                <span style={{ color: 'grey' }}>Мест всего - </span>{maximumStudentsCount}
                                <br />
                                <span style={{ color: 'grey' }}>Мест свободно - </span>{remainingSlotsCount}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <Col className='container-md col-md-9 align-items-start justify-content-start'>
            <h2 className="ms-2">Группа - {groupName}</h2>
            <Row className="mt-2 ms-auto">
                {courses.map(renderCourseCard)}
            </Row>
        </Col>
    );
}

export default CoursesList;