import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groupsApi from '../../api/groupsApi';
import { GroupContext } from '../groups/groupContext';

const CoursesList = async ({}) => {
    const { groupId } = useContext(GroupContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {groupsApi.GetGroupCourses(groupId).then(setCourses);}, [groupId]);

    const renderCourseCard = (course) => {const { id, name, startYear, semester, maximumStudentsCount, remainingSlotsCount, status } = course;

    const statusColor = {
        Started: 'green',
        InProgress: 'blue',
        Closed: 'red',
        Created: 'grey'
    };

    return (
        <Col key={id} xs={12} md={6} lg={4}>
        <Card>
            <Card.Header>{name}</Card.Header>
            <Card.Body>
            <Card.Text>
                Учебный год: {startYear}
                <br />
                Семестр: {semester}
                <br />
                Мест всего: {maximumStudentsCount}
                <br />
                Мест свободно: {remainingSlotsCount}
            </Card.Text>
            <Card.Text>
                <span style={{ color: statusColor[status] }}>{status}</span>
            </Card.Text>
            </Card.Body>
        </Card>
        </Col>
    );
    };

    return (
    <div>
        <h2>Список курсов</h2>
        <Row>{courses.map(renderCourseCard)}</Row>
    </div>
    );
}

export default CoursesList;