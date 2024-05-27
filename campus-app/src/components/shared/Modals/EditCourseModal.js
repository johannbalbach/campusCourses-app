import React, { useState, useEffect} from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import coursesApi from '../../../api/coursesApi';

const EditCourseModal = ({data, showModal, handleCloseModal}) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        requirements: data.requirements,
        annotations: data.annotations
    });
    const [localShowModal, setLocalShowModal] = useState(false); // Добавляем локальное состояние

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['image', 'video'],
        ['code']
      ];
      
    useEffect(() => {
        setLocalShowModal(showModal); // Обновляем локальное состояние при изменении showModal
    }, [showModal]);

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        if (formData.annotations == '' || formData.requirements == ''){
            return;
        }

        await coursesApi.editCourseRequirementsAndAnnotations(id, formData);
        handleCloseModal(false);
        setLocalShowModal(false); // Закрываем модальное окно после сохранения
    };

    return (
        <Modal show={localShowModal} onHide={() => handleCloseModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование курса</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveCourse}>
                <Modal.Body>
                <Form.Group controlId="formRequirements" className='mt-2'>
                        <Form.Label>Требования</Form.Label>
                        <ReactQuill name="requirements" value={formData.requirements}  onChange={(e) => {setFormData({ ...formData, 'requirements': e })}} modules={{ toolbar: toolbarOptions }}/>
                    </Form.Group>
                    <Form.Group controlId="formAnnotations" className='mt-2'>
                        <Form.Label>Аннотации</Form.Label>
                        <ReactQuill name="annotations" value={formData.annotations}  onChange={(e) => {setFormData({ ...formData, 'annotations': e })}} modules={{ toolbar: toolbarOptions }}/>
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

export default EditCourseModal;
