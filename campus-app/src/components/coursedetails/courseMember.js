import React, {useState} from 'react';
import { Card, ListGroup, Nav, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './courseCard.css';
import PendingButtons from './PeddingButtons';
import EditModal from './EditModal';

const CourseMember = ({ body, memberType, userRole }) => {
    const { email, isMain, name, finalResult, id, midtermResult, status } = body;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const statusColor = {
        Accepted: 'green',
        OpenForAssigning: 'blue',
        Finished: 'red',
        Created: 'grey',
        NotDefined: 'grey',
        Successed: 'green',
        Failed: 'red'
    };

    const handleEditResult = (resultType) => {
        // Open EditModal with studentId and result value (midtermResult or finalResult)
        setModalOpen(true);
        setSelectedResult(resultType);
      };

    const memberBody = () => {
        return (
        <>
                <h5 style={{ fontSize: '1.1rem' }}>{name} {memberType === 'teacher' && <span className="green-square">основной</span>}</h5>
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
            {/* <EditModal
            show={modalOpen}
            studentId={body.id}
            // Pass initial result based on selectedResult
            midtermResult={selectedResult === 'midterm' ? body.midtermResult : null}
            finalResult={selectedResult === 'final' ? body.finalResult : null}
            onClose={() => setModalOpen(false)}
            /> */}
        </>
    );
};

export default CourseMember;