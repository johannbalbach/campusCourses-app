import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Row, Col } from 'react-bootstrap';
import groupsApi from '../api/groupsApi';

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [userRole, setUserRole] = useState('user');

    useEffect(() => {
        const fetchGroups = async () => {
            const data = await groupsApi.getGroups();
            setGroups(data);
        };
        fetchGroups();
    }, []);

    const handleEditGroup = (group) => {
        setSelectedGroup(group);
        setGroupName(group.name);
        setShowModal(true);
    };

    const handleDeleteGroup = (groupId) => {
        groupsApi.deleteGroup(groupId)
            .then(() => {
                const updatedGroups = groups.filter(group => group.id !== groupId);
                setGroups(updatedGroups);
            })
            .catch(error => console.error(error));
    };

    const handleSaveGroup = () => {
        const updatedGroups = groups.map(group => {
            if (group.id === selectedGroup.id) {
                return { ...group, name: groupName };
            }
            return group;
        });
        setGroups(updatedGroups);
        setShowModal(false);
    };

    return (
        <Container className='col-md-11 col-lg-9 col-xl-8 col-xxl-7'>
            <h1>Группы курсов</h1>
            {userRole === 'admin' && (
                <Button onClick={() => setShowModal(true)} className='ms-auto mt-4 mb-2'>Создать группу</Button>
            )}
            <div className='mt-4'>
                {groups.map((group) => (
                    <Row key={group.id} className='mt-2 border ms-auto'>
                        <Col className='container-md col-md-8 mt-auto mb-auto align-items-start justify-content-start'>{group.name}</Col>
                        <div className=' container-md col-md-4 d-flex justify-content-end mt-2 mb-2'>
                            {userRole === 'admin' ? (
                                <div>
                                    <Button className = '' variant="warning" onClick={() => handleEditGroup(group)}>Редактировать</Button>{' '}
                                    <Button className = 'ms-3 me-3 ' variant="danger" onClick={() => handleDeleteGroup(group.id)}>Удалить</Button>
                                </div>
                            ) : (
                                <div className='mt-3 mb-3'>

                                </div>
                            )}
                        </div>
                    </Row>
                ))}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать группу</Modal.Title>
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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                    <Button variant="primary" onClick={handleSaveGroup}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default GroupsList;