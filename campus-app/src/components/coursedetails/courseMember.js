import React, {useState, useEffect} from 'react';
import { Card, ListGroup, Nav, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './courseCard.css';
import PendingButtons from './PeddingButtons';
import EditMarkModal from './Modals/EditMarkModal';
import myCoursesApi from '../../api/myCoursesApi';

const CourseMember = ({ body, memberType, isPrivileged }) => {
    const { email, isMain, name, finalResult, id, midtermResult, status } = body;
    const [selectedResult, setSelectedResult] = useState(null);
    const [IsSubscribed, setIsSubscribed] = useState(false);
    const statusColor = {
        Accepted: 'green',
        OpenForAssigning: 'blue',
        Finished: 'red',
        Created: 'grey',
        NotDefined: 'grey',
        Successed: 'green',
        Failed: 'red'
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await myCoursesApi.subscribed();

            if (data.length > 0){
                data.some((course) => course.id === id) ? setIsSubscribed(true) : setIsSubscribed(false);
            }
        };
        
        fetchData();
    }, [IsSubscribed]);

    const [modalData, setModalData] = useState({
        name: name,
        markType: '',
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
                <span style={{ color: 'grey' }}>{email}</span>
        </>
        );
      };
  
    const renderStatusContent = () => {
        switch (status) {
            case 'Pending':
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
                        <Col className='col-4'>
                            <Link to="#" onClick={() => handleEditResult('midterm')}>
                                Промежуточная аттестация 
                            </Link>
                            <span> – </span>
                            <span className='green-square' style={{ backgroundColor: statusColor[midtermResult] }}>{midtermResult}</span>
                        </Col>
                        <Col className='col-4'>
                            <Link to="#" onClick={() => handleEditResult('final')}>
                                Финальная аттестация
                            </Link>
                            <span> – </span>
                            <span className='green-square' style={{ backgroundColor: statusColor[finalResult] }}>{finalResult}</span>
                        </Col>
                    </Row>
                );
            case 'Rejected':
                return (
                <>
                    {memberBody()}
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
            {isPrivileged && <EditMarkModal data={body} showModal={showMarkStatusModal} handleCloseModal={handleModalClose}/>}
        </>
    );
};

export default CourseMember;