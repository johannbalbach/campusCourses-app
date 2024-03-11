import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import profileApi from '../api/profileApi';

const RegisterForm = () => {
    const [fullName, setFullName] = useState({ value: '', isValid: true });
    const [dob, setDob] = useState({ value: '', isValid: true });
    const [email, setEmail] = useState({ value: '', isValid: true });
    const [password, setPassword] = useState({ value: '', isValid: true });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isValid: true });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  
    const handlePasswordChange = async (value) => {
      setPassword({ value, isValid: /^(?=.*\d).{6,}$/.test(value) });
      setPasswordsMatch(value === confirmPassword.value);
    };
  
    const handleConfirmPasswordChange = async (value) => {
      setConfirmPassword({ value, isValid: /^(?=.*\d).{6,}$/.test(value) });
      setPasswordsMatch(value === password.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (password.value !== confirmPassword.value) {
        setConfirmPassword((prevState) => ({ ...prevState, isValid: false }));
        return;
      }

      const body = {
        fullName: fullName.value,
        birthDate: dob.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      }
      
      await profileApi.registration(body);
  
      setFullName({ value: '', isValid: true });
      setDob({ value: '', isValid: true });
      setEmail({ value: '', isValid: true });
      setPassword({ value: '', isValid: true });
      setConfirmPassword({ value: '', isValid: true });
      setPasswordsMatch(true);
    };
  
    return (
      <Container className="d-flex justify-content-center" style={{ height: '100vh' }}>
        <Row className="col-md-11 col-lg-9 col-xl-8 col-xxl-7 p-3 mb-6">
          <Col xs={12}>
            <div className="mb-6 fs-2 h3"> Регистрация нового пользователя </div>
            <Form id="registerForm" className="needs-validation" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>ФИО:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Иванов Иван Иванович"
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
                  onChange={async (e) => await handlePasswordChange(e.target.value)}
                  required
                  isInvalid={!password.isValid}
                />
                <Form.Control.Feedback type="invalid">Пароль должен содержать хотя бы одну цифру и шесть знаков</Form.Control.Feedback>
                {!password.isValid && <div className='text-danger'>Введите корректный пароль.</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Повторите пароль:</Form.Label>
                <Form.Control
                  type="password"
                  pattern="^(?=.*\d).{6,}$"
                  value={confirmPassword.value}
                  onChange={async (e) => await handleConfirmPasswordChange(e.target.value)}
                  required
                  isInvalid={!confirmPassword.isValid || !passwordsMatch}
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, повторите пароль.</Form.Control.Feedback>
                {!passwordsMatch && <div className="text-danger">Пароли не совпадают.</div>}
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

  
export default RegisterForm;