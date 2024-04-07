import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CourseMembers = ({ members }) => {
    return (
        <Card>
        <Card.Header>
            <h2>Список участников</h2>
        </Card.Header>
        <Card.Body>
            <ListGroup>
            {members.map(member => (
                <ListGroup.Item key={member.id}>{member.name} ({member.role})</ListGroup.Item>
            ))}
            </ListGroup>
        </Card.Body>
        </Card>
    );
};

export default CourseMembers;