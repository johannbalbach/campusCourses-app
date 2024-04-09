import React, { useState, useEffect, useContext} from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import CoursesList from './coursesList';
import groupsApi from '../../api/groupsApi';
import UserSelector from '../../shared/userSelector';
import coursesApi from '../../../api/coursesApi';

const AddTeacherModal = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await groupsApi.userList();

            setAllUsers(data);
        };
        fetchData();
    }, []);

    const handleMainTeacher = (e) => {
        setUserId({'userId': e.value });
    }

    const handleSaveCourse = async (e) => {
        e.preventDefault();

        await coursesApi.addTeacherToCourse(id, userId);
        setShowModal(false);
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Создать новый курс</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveCourse}>
                <Modal.Body>
                    <UserSelector name="mainTeacherId" teachers={allUsers} onSelect={handleMainTeacher}></UserSelector>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                    <Button variant="primary" type="submit">Создать</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddTeacherModal;
