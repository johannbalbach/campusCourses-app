import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import profileApi from '../../api/profileApi';
import FormField from '../shared/FormField';

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
              <FormField
                controlId="fullName"
                label="ФИО:"
                value={fullName.value}
                onChange={(e) => setFullName({ value: e.target.value, isValid: true })}
                type="text"
                placeholder="Иванов Иван Иванович"
                isValid={fullName.isValid}
                pattern="^(?=.*\d).{6,}$"
                feedbackText="Пожалуйста, введите корректный ФИО."/>
              <FormField
                controlId="dob"
                label="Дата рождения:"
                value={dob.value}
                onChange={(e) => setDob({ value: e.target.value, isValid: e.target.value.match(e.target.pattern)})}
                type="date"
                max="2023-12-10"
                isValid={dob.isValid}
                pattern="^(19\d\d|20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
                feedbackText="Пожалуйста, введите корректную дату рождения."/>
              <FormField
                controlId="email"
                label="Email:"
                value={email.value}
                onChange={(e) => setEmail({ value: e.target.value, isValid: e.target.value.match(e.target.pattern) })}
                type="email"
                placeholder="name@example.com"
                isValid={email.isValid}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                feedbackText="Пожалуйста, введите корректный email."/>
              <FormField
                controlId="password"
                label="Пароль:"
                value={password.value}
                onChange={(e) => handlePasswordChange(e.target.value)}
                type="password"
                isValid={password.isValid}
                pattern="^(?=.*\d).{6,}$"
                feedbackText="Пароль должен содержать хотя бы одну цифру и шесть знаков"/>
              <FormField
                controlId="confirmPassword"
                label="Повторите пароль:"
                value={confirmPassword.value}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                type="password"
                isValid={confirmPassword.isValid && passwordsMatch}
                feedbackText="Пожалуйста, используйте такой же пароль."/>
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