import React from 'react';
import { Col } from 'react-bootstrap';
import CoursesList from './coursesList';

const MyCourses = () => {
    return (
        <Col className='container-md col-md-9 align-items-start justify-content-start'>
            <h2 className="ms-auto mb-4">Мои курсы</h2>
            <CoursesList type="subscribed" />
        </Col>
    );
}

export default MyCourses;