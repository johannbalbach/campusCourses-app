import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import profileApi from '../../api/profileApi';
import FormField from '../shared/FormField';

const LoginForm = () => {
    const [email, setEmail] = useState({ value: '', isValid: true });
    const [password, setPassword] = useState({ value: '', isValid: true });
    const [loginError, setLoginError] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const body = {
        email: email.value,
        password: password.value,
      }
      
      await profileApi.login(body).catch(error => {
        setLoginError(true);
      });
  
      setEmail({ value: '', isValid: true });
      setPassword({ value: '', isValid: true });
    };

    useEffect(() => {
      if (loginError) {
          const timer = setTimeout(() => {
              setLoginError(false);
          }, 1200); // Сброс ошибки через 3 секунды
          return () => clearTimeout(timer);
          }
      }, [loginError]);

      return (
        <Container className="d-flex justify-content-center" style={{ height: '75vh' }}>
          <Row className="col-md-11 col-lg-9 col-xl-8 col-xxl-7 p-3 mb-6">
            <Col xs={12}>
              <div className="mb-6 fs-2 h3"> Авторизация </div>
              <Form id="LoginForm" className="needs-validation" onSubmit={handleSubmit}>
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
                  onChange={async (e) => setPassword({ value: e.target.value, isValid: e.target.value.match(e.target.pattern) })}
                  type="password"
                  isValid={password.isValid}
                  pattern="^(?=.*\d).{6,}$"
                  feedbackText="Пароль должен содержать хотя бы одну цифру и шесть знаков"/>
                <Button variant="primary" type="submit" id="loginBtn" style={{ backgroundColor: loginError ? 'red' : '' }}>
                  {loginError ? 'Неправильный логин или пароль' : 'Войти'}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
  };

  
export default LoginForm;