import React from 'react';
import { Col } from 'react-bootstrap';
import CoursesList from './coursesList';

const TeachingCourses = () => {
    return (
        <Col className='container-md col-md-9 align-items-start justify-content-start'>
            <h2 className="ms-auto mb-4">Преподаваемые курсы</h2>
            <CoursesList type="teaching" />
        </Col>
    );
}

export default TeachingCourses;