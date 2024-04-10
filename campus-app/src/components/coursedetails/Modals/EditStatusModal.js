import React, { useState} from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import coursesApi from '../../../api/coursesApi';

const EditStatusModal = ({data, showModal, handleCloseModal}) => {
    const { id } = useParams();
    const [status, setStatus] = useState(data.status);

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        if (status == ''){
            return;
        }

        await coursesApi.editCourseStatus(id, {status: status});
        handleCloseModal(false);
    };

    return (
        <Modal show={showModal} onHide={() => handleCloseModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveCourse}>
                <Modal.Body>
                    <Form.Group controlId="formStatus" className='mt-2 mb-2'>
                        <Form.Label>Статус</Form.Label>
                        <br></br>
                        <Form.Check
                            inline
                            label="В процессе обучения"
                            type="checkbox"
                            id="open"
                            name="status"
                            value="Started"
                            checked={status === "Started"}
                            onChange={() => {setStatus("Started")}}
                        />
                        <Form.Check
                            inline
                            label="Открыт для записи"
                            type="checkbox"
                            id="inprocess"
                            name="status"
                            value="OpenForAssigning"
                            checked={status === "OpenForAssigning"}
                            onChange={() => {setStatus("OpenForAssigning")}}
                        />
                        <Form.Check
                            inline
                            label="Завершен"
                            type="checkbox"
                            id="closed"
                            name="status"
                            value="Finished "
                            checked={status === "Finished"}
                            onChange={() => {setStatus("Finished")}}
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

export default EditStatusModal;
