import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import profileApi from '../api/profileApi';

const LoginForm = () => {
    const [email, setEmail] = useState({ value: '', isValid: true });
    const [password, setPassword] = useState({ value: '', isValid: true });
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const body = {
        email: email.value,
        password: password.value,
      }
      
      await profileApi.login(body);
  
      setEmail({ value: '', isValid: true });
      setPassword({ value: '', isValid: true });
    };
  
    return (
      <Container className="d-flex justify-content-center" style={{ height: '75vh' }}>
        <Row className="col-md-11 col-lg-9 col-xl-8 col-xxl-7 p-3 mb-6">
          <Col xs={12}>
            <div className="mb-6 fs-2 h3"> Авторизация </div>
            <Form id="LoginForm" className="needs-validation" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  value={email.value}
                  onChange={(e) => setEmail({ value: e.target.value, isValid: e.target.value.match(e.target.pattern) })}
                  required
                  isInvalid={!email.isValid}
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, введите корректный email.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Пароль:</Form.Label>
                <Form.Control
                  type="password"
                  pattern="^(?=.*\d).{6,}$"
                  value={password.value}
                  onChange={async (e) => setPassword({ value: e.target.value, isValid: e.target.value.match(e.target.pattern) })}
                  required
                  isInvalid={!password.isValid}
                />
                <Form.Control.Feedback type="invalid">Пароль должен содержать хотя бы одну цифру и шесть знаков</Form.Control.Feedback>
                {!password.isValid && <div className='text-danger'>Введите корректный пароль.</div>}
              </Form.Group>
              <Button variant="primary" type="submit" id="loginBtn">
              Войти
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  
export default LoginForm;