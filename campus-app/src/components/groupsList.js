import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal } from 'react-bootstrap';
import groupsApi from '../api/groupsApi';

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [userRole, setUserRole] = useState('admin');

    useEffect(() => {
    const fetchGroups = async () => {
        const data = await groupsApi.getGroups();
        setGroups(data);
    };
    fetchGroups();
    }, []);

    const handleEditGroup = (group) => {
    // Обработчик редактирования группы
    setSelectedGroup(group);
    setGroupName(group.name);
    setShowModal(true);
    };

    const handleDeleteGroup = (groupId) => {
    // Обработчик удаления группы
    // Отправить запрос на удаление группы с указанным ID
    // Обновить список групп после успешного удаления
    groupsApi.deleteGroup(groupId)
        .then(() => {
        const updatedGroups = groups.filter(group => group.id !== groupId);
        setGroups(updatedGroups);
        })
        .catch(error => console.error(error));
    };

    const handleSaveGroup = () => {
    // Обработчик сохранения изменений в группе
    // Отправить запрос на сервер для сохранения изменений
    // Обновить список групп после успешного сохранения
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
    <Container>
        <h1>Группы курсов</h1>
        {userRole === 'admin' && (
        <Button onClick={() => setShowModal(true)}>Создать группу</Button>
        )}
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Название группы</th>
            {userRole === 'admin' && <th>Действия</th>}
            </tr>
        </thead>
        <tbody>
            {groups.map((group, index) => (
            <tr key={group.id}>
                <td>{index + 1}</td>
                <td><a href={`/courses/${group.id}`}>{group.name}</a></td>
                {userRole === 'admin' && (
                <td>
                    <Button variant="info" onClick={() => handleEditGroup(group)}>Редактировать</Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteGroup(group.id)}>Удалить</Button>
                </td>
                )}
            </tr>
            ))}
        </tbody>
        </Table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Редактировать группу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="form-control"
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