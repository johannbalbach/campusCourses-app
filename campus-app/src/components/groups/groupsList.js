import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Table, Modal, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groupsApi from '../../api/groupsApi';
import GroupModal from './groupModal';

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState({});
    const [userRole, setUserRole] = useState('admin');
    const [onSave, setOnSave] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            const data = await groupsApi.getGroups();
            setGroups(data);
        };
        fetchGroups();
    }, []);

    const changeModal = useCallback((title, data, onSave) => {
        setModalTitle(title);
        setModalData(data);
        setShowModal(true);
        setOnSave(() => onSave);
    }, []);

    const handleDeleteGroup = async (groupId) => {
        await groupsApi.deleteGroup(groupId);
    };

    const handleEditGroup = async (groupId, body) => {
        await groupsApi.editGroup(groupId, body);
        setShowModal(false);
    };

    const handleCreateGroup = async (groupId, body) => {
        await groupsApi.createGroup(groupId, body);
        setShowModal(false);
    };

    return (
        <Container className='container-md col-md-9 align-items-start justify-content-start'>
            <h1>Группы курсов</h1>
            {userRole === 'admin' && (
                <Button onClick={() => changeModal("Создать группу", {}, handleCreateGroup)} className='ms-auto mt-4 mb-2'>Создать группу</Button>
            )}
            <div className='mt-4'>
                {groups.map((group) => (
                    <Row key={group.id} className='mt-2 border ms-auto'>
                        <Col className='col-sm-8 mt-auto mb-auto align-items-start justify-content-start'>
                            <Link to={`/groups/${group.id}`} state={{groupName: group.name}} className='text-dark ms-2' style={{textDecoration: 'none', fontSize: '1.1rem'}}>
                                {group.name}
                            </Link>
                        </Col>
                        <div className='col-sm-4 d-flex justify-content-end mt-2 mb-2'>
                            {userRole === 'admin' && (
                                <div>
                                    <Button onClick={() => changeModal("Редактировать группу", group, handleEditGroup)} className='ms-3 mt-auto mb-auto' variant="warning">Редактировать</Button>
                                    <Button onClick={() => handleDeleteGroup(group.id)} className='ms-3 mt-auto mb-auto' variant="danger">Удалить</Button>
                                </div>
                            )}
                        </div>
                    </Row>
                ))}
            </div>
            <GroupModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={modalTitle}
                onSave={onSave}
                data={modalData}
            />
        </Container>
    );
};

export default GroupsList;
