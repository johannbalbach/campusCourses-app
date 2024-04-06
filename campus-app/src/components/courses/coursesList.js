import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import coursesApi from '../../api/coursesApi';
import groupsApi from '../../api/groupsApi';

const CoursesList = ({ type, id }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let data = [];
            if (type === 'subscribed') {
                data = await coursesApi.subscribed();
            } else if (type === 'teaching') {
                data = await coursesApi.teaching();
            } else if (type === 'group') {
                data = await groupsApi.getGroupCourses(id);
            }
            setCourses(data);
        };
        fetchData();
    }, [type, id]);

    const handleCourseClick = (id) => {
        history.push(`/courses/${id}`);
    };

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
        <>
            {courses.map(renderCourseCard)}
        </>
    );
}

export default CoursesList;