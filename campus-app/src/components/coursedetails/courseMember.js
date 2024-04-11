import React, {useState, useEffect} from 'react';
import { Card, ListGroup, Nav, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './courseCard.css';
import PendingButtons from './PeddingButtons';
import EditMarkModal from './Modals/EditMarkModal';
import myCoursesApi from '../../api/myCoursesApi';
import {connect} from 'react-redux';

const CourseMember = ({ body, memberType, isPrivileged, IsSubscribed, email }) => {
    const [memberEmail, setMemberEmail] = useState(body.email);
    const {isMain, name, finalResult, id, midtermResult, status } = body;
    const [selectedResult, setSelectedResult] = useState(null);
    const statusColor = {
        Accepted: 'green',
        OpenForAssigning: 'blue',
        Finished: 'red',
        Created: 'grey',
        NotDefined: 'grey',
        Successed: 'green',
        Failed: 'red',
        Declined: 'red',
        InQueue: 'blue'
    };

    const [modalData, setModalData] = useState({
        name: name,
        markType: 'midterm',
        studentId: id
    })
    const [showMarkStatusModal, setShowMarkStatusModal] = useState(false);
    const handleModalClose = () => setShowMarkStatusModal(false);
    const handleModalOpen = () => setShowMarkStatusModal(true);

    const handleEditResult = (markType) => {
        setModalData({...modalData, 'markType': markType});

        handleModalOpen();
    }

    const memberBody = () => {
        return (
        <>
            <h5 style={{ fontSize: '1.1rem' }}> {name} {isMain && <span className="green-square">основной</span>}</h5>
            {memberType === 'student' && (
                <>
                    <span style={{ color: 'grey' }}>Статус – </span>
                    <span style={{ color: statusColor[status] }}>{status}</span>
                    <br></br>
                </>
            )}
            <span style={{ color: 'grey' }}>{memberEmail}</span>
        </>
        );
      };
  
    const renderStatusContent = () => {
        switch (status) {
            case 'InQueue':
                return (
                    <Row>
                        <Col className='col-8'>
                            {memberBody()}
                        </Col>
                        <Col className='col-4 justify-content-end align-items-end d-flex mb-auto'>
                            <PendingButtons studentId={id} />
                        </Col>
                    </Row>
                )
            case 'Accepted':
                return (
                    <Row>
                        <Col className='col-4'>
                            {memberBody()}
                        </Col>
                        {IsSubscribed && (memberEmail === email) && (<>
                            <Col className='col-4'>
                                <span> Промежуточная аттестация – </span>
                                <span className='green-square' style={{ backgroundColor: statusColor[midtermResult] }}>{midtermResult}</span>
                            </Col>
                            <Col className='col-4'>
                                <span> Финальная аттестация – </span>
                                <span className='green-square' style={{ backgroundColor: statusColor[finalResult] }}>{finalResult}</span>
                            </Col>
                        </>)}
                        {isPrivileged && (<>
                            <Col className='col-4'>
                            <Link to="#" onClick={() => handleEditResult('Midterm')}>
                                Промежуточная аттестация 
                            </Link>
                            <span> – </span>
                            <span className='green-square' style={{ backgroundColor: statusColor[midtermResult] }}>{midtermResult}</span>
                            </Col>
                            <Col className='col-4'>
                                <Link to="#" onClick={() => handleEditResult('Final ')}>
                                    Финальная аттестация
                                </Link>
                                <span> – </span>
                                <span className='green-square' style={{ backgroundColor: statusColor[finalResult] }}>{finalResult}</span>
                            </Col>
                        </>)}
                    </Row>
                );
            case 'Declined':
                return (
                <>  
                    {IsSubscribed && (memberEmail === email) && (memberBody())}
                    {isPrivileged && (memberBody())}
                </>);
            default:
                return null;
        }
    };
  
    const renderContent = () => {
        return (        
        <div className='border-bottom border-2 mt-2 mb-2'>
            {memberType === 'teacher' ? (
                <>
                    {memberBody()}
                </>
            ):(
                <>
                    {renderStatusContent()}
                </>
            )}
        </div>)
    }

    return (
        <>
            {renderContent()}
            {isPrivileged && <EditMarkModal data={modalData} showModal={showMarkStatusModal} handleCloseModal={handleModalClose}/>}
        </>
    );
};

const mapStateToProps = state => ({
    email: state.email
});

export default connect(mapStateToProps)(CourseMember);