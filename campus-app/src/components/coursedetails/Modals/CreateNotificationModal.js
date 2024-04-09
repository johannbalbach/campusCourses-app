import React, { useState} from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import coursesApi from '../../../api/coursesApi';

const EditCourseModal = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState('');
    const [isImportant, setIsImportant] = useState(false);

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        if (notification == ''){
            return;
        }

        await coursesApi.createCourseNotification(id, {text: notification, isImportant: isImportant});
        setShowModal(false);
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование курса</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveCourse}>
                <Modal.Body>
                    <Form.Group controlId="formRequirements" className='mt-2'>
                        <Form.Label>Требования</Form.Label>
                        <Form.Control as="textarea" rows={3} name="requirements" value={formData.requirements} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formStatus" className='mt-2 mb-2'>
                        <Form.Label>Важное объявление:</Form.Label>
                        <Form.Check
                            inline
                            type="checkbox"
                            id="important"
                            value={false}
                            checked={isImportant === true}
                            onChange={handleInputChange}
                            className='ms-3'
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                    <Button variant="primary" type="submit">Создать</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditCourseModal;
