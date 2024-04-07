import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';

const GroupModal = ({ show, onHide, title, onSave, data }) => {
    const [groupName, setGroupName] = useState();

    useEffect(() => {
        data.name ? setGroupName(data.name) : setGroupName('');
    }, [data.name]);
    
    const handleSave = () => {
        console.log(data, groupName);
        onSave(data.id, {name: groupName});
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Название группы</h6>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="form-control mb-3"
                    placeholder="Введите название группы"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
                <Button variant="primary" onClick={handleSave}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GroupModal;