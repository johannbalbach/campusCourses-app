import React, { useState } from 'react';
import { Card, Nav, Row, Col, Button, Modal } from 'react-bootstrap';
import coursesApi from '../../api/coursesApi';

const PendingButtons = ({ studentId }) => {
    const [isPending, setIsPending] = useState(true);
  
    const handleAccept = async () => {
      // API call to accept student
        setIsPending(false);
    };
  
    const handleReject = async () => {
      // API call to reject student
        setIsPending(false);
    };
  
    return (
      <>
        {isPending && (
        <>
            <Button variant="primary" size="sm" onClick={handleAccept}>
                Принять
            </Button>
            <Button variant="danger" size="sm" onClick={handleReject}>
                Отклонить
            </Button>
        </>
        )}
      </>
    );
  };

export default PendingButtons;
