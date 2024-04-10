import React, { useState } from 'react';
import { Card, Nav, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import coursesApi from '../../api/coursesApi';

const PendingButtons = ({ studentId }) => {
    const { id } = useParams();
    const [isPending, setIsPending] = useState(true);
  
    const handleAccept = async () => {
        await coursesApi.editStudentStatus(id, studentId, {status:'Accepted'})

        setIsPending(false);
    };
  
    const handleReject = async () => {
        await coursesApi.editStudentStatus(id, studentId, {status:'Declined'})

        setIsPending(false);
    };
  
    return (
      <>
        {isPending && (
        <>
            <Button style={{borderRadius: '0', fontSize: '0.8rem'}} variant="primary" className='mb-1 mt-1' onClick={handleAccept}>
                Принять
            </Button>
            <Button style={{borderRadius: '0', fontSize: '0.8rem'}} variant="danger" className='mb-1 mt-1' onClick={handleReject}>
                Отклонить
            </Button>
        </>
        )}
      </>
    );
  };

export default PendingButtons;
