import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import myCoursesApi from '../../api/myCoursesApi';
import groupsApi from '../../api/groupsApi';
import { Link } from 'react-router-dom';

const CoursesList = ({ type, id = 0 }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let data = [];
            if (type === 'subscribed') {
                data = await myCoursesApi.subscribed();
            } else if (type === 'teaching') {
                data = await myCoursesApi.teaching();
            } else if (type === 'group') {
                data = await groupsApi.getGroupCourses(id);
            }
            setCourses(data);
        };
        fetchData();
    }, [type, id]);

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
                    <Card style={{borderRadius: '0'}}>
                        <Link to={`/courses/${id}`} className='text-dark' style={{textDecoration: 'none'}}>
                            <Card.Body>
                                <Row className=''>
                                    <Col className='col-9'>
                                        <h5 style={{ fontSize: '1.3rem' }}>{name}</h5>
                                    </Col>
                                    <Col className='col-3 justify-content-end align-items-end d-flex mb-auto'>
                                        <span style={{ color: statusColor[status] }}>{status}</span>
                                    </Col>
                                </Row>
                                <span>Учебный год – </span>{startYear}-{startYear + 1}
                                <br />
                                <span>Семестр – </span>{semester}
                                <br />
                                <span style={{ color: 'grey' }}>Мест всего – </span>{maximumStudentsCount}
                                <br />
                                <span style={{ color: 'grey' }}>Мест свободно – </span>{remainingSlotsCount}
                            </Card.Body>
                        </Link>
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