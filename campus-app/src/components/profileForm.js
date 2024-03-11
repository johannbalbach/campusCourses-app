import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import profileApi from '../api/profileApi';

const ProfileForm = () => {
    const [fullName, setFullName] = useState({ value: '', isValid: true });
    const [dob, setDob] = useState({ value: '', isValid: true });
    const [email, setEmail] = useState({ value: '', isValid: true });

    useEffect(() => {
        const fetchData = async () => {
          data = await profileApi.getProfile();

          fullName.value = data.fullName;
          dob.value = data.birthDate;
          email.value = data.email;
        };
    
        fetchData();
      }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const body = {
        fullName: fullName.value,
        email: email.value,
      }
      
      await profileApi.editProfile(body);
  
      setFullName({ value: '', isValid: true });
      setDob({ value: '', isValid: true });
      setEmail({ value: '', isValid: true });
    };
  
    return (
      <Container className="d-flex justify-content-center" style={{ height: '100vh' }}>
        <Row className="col-md-11 col-lg-9 col-xl-8 col-xxl-7 p-3 mb-6">
          <Col xs={12}>
            <div className="mb-6 fs-2 h3"> Профиль </div>
            <Form id="profileForm" className="needs-validation" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>ФИО:</Form.Label>
                <Form.Control
                  type="text"
                  value={fullName.value}
                  onChange={(e) => setFullName({ value: e.target.value, isValid: true })}
                  required
                  isInvalid={!fullName.isValid}
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, введите корректный ФИО.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="dob">
                <Form.Label>Дата рождения:</Form.Label>
                <Form.Control
                  type="date"
                  pattern="^(19\d\d|20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
                  max="2023-12-10"
                  value={dob.value}
                  onChange={(e) => setDob({ value: e.target.value, isValid: e.target.value.match(e.target.pattern)})}
                  required
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, введите корректную дату рождения.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  value={email.value}
                  onChange={(e) => setEmail({ value: e.target.value, isValid: e.target.value.match(e.target.pattern) })}
                  required
                  isInvalid={!email.isValid}
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, введите корректный email.</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" id="registerBtn">
              Зарегистрироваться
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  
export default ProfileForm;