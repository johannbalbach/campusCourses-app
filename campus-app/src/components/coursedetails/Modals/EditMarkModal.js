import React, { useState} from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import coursesApi from '../../../api/coursesApi';

const EditMarkModal = ({data, showModal, handleCloseModal}) => {
    const { id } = useParams();
    const [mark, setMark] = useState();
    const [name, markType, studentId] = data;

    const handleSaveCourse = async (e) => { 
        e.preventDefault();
        if (mark == ''){
            return;
        }

        await coursesApi.editStudentMark(id, studentId, {markType: markType, mark: mark});
        handleCloseModal(false);
    };

    return (
        <Modal show={showModal} onHide={() => handleCloseModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveCourse}>
                <Modal.Body>
                    <Form.Group controlId="formMark" className='mt-2 mb-2'>
                        <Form.Label>Студент – {name}</Form.Label>
                        <br></br>
                        <Form.Check
                            inline
                            label="Пройдено"
                            type="checkbox"
                            id="passed"
                            value="Passed"
                            checked={mark === "Passed"}
                            onChange={((e) =>{setMark(e)})}
                        />
                        <Form.Check
                            inline
                            label="Зафейлено"
                            type="checkbox"
                            id="failed"
                            value="Failed"
                            checked={mark === "Failed"}
                            onChange={((e) =>{setMark(e)})}    
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

export default EditMarkModal;
