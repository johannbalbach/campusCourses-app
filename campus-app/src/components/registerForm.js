import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';

const RegisterForm = () => {
    const [fullName, setFullName] = useState({ value: '', isValid: true });
    const [dob, setDob] = useState({ value: '', isValid: true });
    const [email, setEmail] = useState({ value: '', isValid: true });
    const [password, setPassword] = useState({ value: '', isValid: true });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isValid: true });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  
    const handlePasswordChange = (value) => {
      setPassword({ value, isValid: true });
      setPasswordsMatch(value === confirmPassword.value);
    };
  
    const handleConfirmPasswordChange = (value) => {
      setConfirmPassword({ value, isValid: true });
      setPasswordsMatch(value === password.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Проверка на соответствие паролей
      if (password.value !== confirmPassword.value) {
        setConfirmPassword((prevState) => ({ ...prevState, isValid: false }));
        return;
      }
  
      // Ваша логика для отправки формы после проверок
      console.log('Form submitted:', { fullName, dob, email, password });
  
      // Сброс состояний
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
            <Form id="registerForm" className="needs-validation" noValidate onSubmit={handleSubmit}>
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
                  onChange={(e) => setDob({ value: e.target.value, isValid: true })}
                  required
                  isInvalid={!dob.isValid}
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, введите корректную дату рождения.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email.value}
                  onChange={(e) => setEmail({ value: e.target.value, isValid: true })}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  required
                  isInvalid={!email.isValid}
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, введите корректный email.</Form.Control.Feedback>
                <Form.Text>Email будет использован для входа в систему</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Пароль:</Form.Label>
                <Form.Control
                  type="password"
                  pattern="^(?=.*\d).{6,}$"
                  value={password.value}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  isInvalid={!password.isValid}
                />
                <Form.Control.Feedback type="invalid">Пожалуйста, введите пароль.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Повторите пароль:</Form.Label>
                <Form.Control
                  type="password"
                  pattern="^(?=.*\d).{6,}$"
                  value={confirmPassword.value}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
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