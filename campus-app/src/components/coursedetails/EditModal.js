import React, { useState } from 'react';
import {Form, Button, Modal } from 'react-bootstrap';

const EditModal = ({ studentId, midtermResult, finalResult, onClose }) => {
    const [updatedMidterm, setUpdatedMidterm] = useState(midtermResult);
    const [updatedFinal, setUpdatedFinal] = useState(finalResult);
  
    
    const handleSubmit = async () => {
      // API call to update student's results
      // Pass studentId, updatedMidterm, and updatedFinal to the API
      onClose();
    };
  
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Редактирование оценки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Промежуточная аттестация</Form.Label>
                        <Form.Input
                            type="text"
                            value={updatedMidterm}
                            onChange={(e) => setUpdatedMidterm(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Финальная аттестация</Form.Label>
                        <Form.Input
                            type="text"
                            value={updatedFinal}
                            onChange={(e) => setUpdatedFinal(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Сохранить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditModal;
