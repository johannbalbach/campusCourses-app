import React, { useState} from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import coursesApi from '../../../api/coursesApi';

const EditCourseModal = ({data}) => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [requirements, annotations] = data;

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['image', 'video'],
        ['code']
      ];

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        if (annotations == '' || requirements == ''){
            return;
        }

        await coursesApi.editCourse(id, {requirements: requirements, annotations: annotations});
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
                        <ReactQuill name="requirements" value={requirements}  onChange={(e) => {setFormData({ ...formData, 'requirements': e })}} modules={{ toolbar: toolbarOptions }}/>
                    </Form.Group>
                    <Form.Group controlId="formAnnotations" className='mt-2'>
                        <Form.Label>Аннотации</Form.Label>
                        <ReactQuill name="annotations" value={annotations}  onChange={(e) => {setFormData({ ...formData, 'annotations': e })}} modules={{ toolbar: toolbarOptions }}/>
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
