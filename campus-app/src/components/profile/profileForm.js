import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import profileApi from '../../api/profileApi';
import FormField from '../shared/FormField';

const ProfileForm = () => {
    const [fullName, setFullName] = useState({ value: '', isValid: true });
    const [dob, setDob] = useState({ value: '', isValid: true });
    const [email, setEmail] = useState({ value: '', isValid: true });

    const setData = ((data) => {
      setFullName({ value: data.fullName, isValid: true });
      setDob({ value: data.birthDate.substr(0, 10), isValid: true });
      setEmail({ value: data.email, isValid: true });
    })
    useEffect(() => {
      const fetchData = async () => {
        const data = await profileApi.getProfile();

        setData(data);
      };
  
      fetchData();
      }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const body = {
        fullName: fullName.value,
        birthDate: dob.value,
      }
    
      const data = await profileApi.editProfile(body);
      setData(data);
    };
  
    return (
      <Container className="d-flex justify-content-center" style={{ height: '100vh' }}>
        <Row className="col-md-12 col-lg-8 p-3 mb-6">
          <Col xs={12}>
            <div className="mb-6 fs-2 h3"> Профиль </div>
            <Form id="profileForm" className="needs-validation" onSubmit={handleSubmit}>
                <FormField
                controlId="fullName"
                label="ФИО:"
                value={fullName.value}
                onChange={(e) => setFullName({ value: e.target.value, isValid: true })}
                type="text"
                placeholder="Иванов Иван Иванович"
                isValid={fullName.isValid}
                feedbackText="Пожалуйста, введите корректный ФИО."
                colSize={9}/>
              <FormField
                controlId="dob"
                label="Дата рождения:"
                value={dob.value}
                onChange={(e) => setDob({ value: e.target.value, isValid: e.target.value.match(e.target.pattern)})}
                type="date"
                max="2024-03-13"
                isValid={dob.isValid}
                pattern="^(19\d\d|20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
                feedbackText="Пожалуйста, введите корректную дату рождения."
                colSize={9}/>
              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm="3">Email:</Form.Label>
                <Col sm="9">
                  <Form.Control column sm="9"
                    disabled
                    readOnly
                    type="email"
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    value={email.value}
                    placeholder= {email.value}
                    onChange={(e) => setEmail({ value: e.target.value, isValid: e.target.value.match(e.target.pattern) })}
                    required
                    isInvalid={!email.isValid}
                  />
                </Col>
                <Form.Control.Feedback type="invalid">Пожалуйста, введите корректный email.</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" id="registerBtn" className="mt-3">
                Изменить
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  
export default ProfileForm;