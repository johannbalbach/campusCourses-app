import React, { useState, useEffect} from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import coursesApi from '../../../api/coursesApi';

const CreateNotificationModal = ({showModal, handleCloseModal}) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        text: '',
        isImportant: false
    });

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        if (formData.text == ''){
            return;
        }

        await coursesApi.createCourseNotification(id, formData);
        handleCloseModal(false);
    };

    return (
        <Modal show={showModal} onHide={() => handleCloseModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Создание уведомления</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveCourse}>
                <Modal.Body>
                    <Form.Group controlId="formNotification" className='mt-2'>
                        <Form.Label>Уведомление</Form.Label>
                        <Form.Control as="textarea" rows={3} name="requirements" value={formData.text} 
                        onChange={(e) =>{setFormData({...formData, 'text': e.target.value})}} />
                    </Form.Group>
                    <Form.Group controlId="formStatus" className='mt-2 mb-2'>
                        <Form.Label>Важное объявление:</Form.Label>
                        <Form.Check
                            inline
                            type="checkbox"
                            id="important"
                            value={true}
                            onChange={(e) =>{setFormData({...formData, 'isImportant': true})}}
                            className='ms-3'
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal(false)}>Отмена</Button>
                    <Button variant="primary" type="submit">Создать</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateNotificationModal;
