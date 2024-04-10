import React, { useState, useEffect, useContext} from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import {connect} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CoursesList from './coursesList';
import groupsApi from '../../api/groupsApi';
import UserSelector from '../shared/userSelector';
import CourseCreateModal from './CourseCreateModal';

const GroupCourses = ({isAdmin}) => {
    const location = useLocation();
    const {id} = useParams();

    const [showCourseCreateModal, setShowCourseCreateModal] = useState(false);
    const handleModalClose = () => setShowCourseCreateModal(false);
    const handleModalOpen = () => setShowCourseCreateModal(true);
    
    const groupName = location.state ? location.state.groupName : 'nothing';

    return (
        <>
        <Col className='container-md col-md-9 align-items-start justify-content-start'>
            <h2 className="ms-auto mb-3">Группа - {groupName}</h2>
            {isAdmin && <Button className="ms-auto mb-3" onClick={handleModalOpen}>Создать новый курс</Button>}
            <CoursesList type="group" id={id}/>
        </Col>
        
        {isAdmin && <CourseCreateModal showModal={showCourseCreateModal} handleCloseModal={handleModalClose}/>}
        </>
    );
}

const mapStateToProps = state => ({
    isAdmin: state.isAdmin
});

export default connect(mapStateToProps)(GroupCourses);
