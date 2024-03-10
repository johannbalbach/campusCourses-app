import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'react-bootstrap';

const RegisterForm = () => {
    const [formData, setFormData] = React.useState({
      fullName: '',
      dob: '',
      gender: '',
      phoneNumber: '',
      email: '',
      password: '',
    });
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Отправка данных на сервер
      // ...
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <Form noValidate onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">ФИО:</Label>
          <Input type="text" id="fullName" name="fullName" placeholder="Иванов Иван Иванович" value={formData.fullName} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dob">Дата рождения:</Label>
          <Input type="date" id="dob" name="dob" pattern="^(19\d\d|20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$" max="2023-12-10" value={formData.dob} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="gender">Пол:</Label>
          <Select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="Male">Мужской</option>
            <option value="Female">Женский</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phoneNumber">Номер телефона:</Label>
          <Input type="tel" id="phoneNumber" name="phoneNumber" placeholder="+7 (xxx) xxx-xx-xx" pattern="^\+\d+(?:\s*(?:\d{1,4}|\(\d{1,4}\))){1,5}(?:\s*-\s*\d{2})?$" value={formData.phoneNumber} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" name="email" placeholder="name@example.com" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" value={formData.email} onChange={handleInputChange} required />
          <p className="text-muted">Email будет использован для входа в систему</p>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Пароль:</Label>
          <Input type="password" id="password" name="password" pattern="^(?=.*\d).{6,}$" value={formData.password} onChange={handleInputChange} required />
        </FormGroup>
        <Button variant="primary" type="submit">Зарегистрироваться</Button>
      </Form>
    );
  };

  export default RegisterForm;