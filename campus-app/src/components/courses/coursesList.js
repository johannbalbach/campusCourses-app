import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import groupsApi from '../../api/groupsApi';
import { GroupContext } from '../groups/groupContext';

const CoursesList = () => {
    const location = useLocation();
    const [courses, setCourses] = useState([]);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        startYear: '',
        maximumStudentsCount: '',
        semester: '',
        requirements: '',
        annotations: '',
        mainTeacherId: ''
    });
    const groupName = location.state ? location.state.groupName : 'nothing';

    useEffect(() => {
        const fetchData = async () => {
            const data = await groupsApi.GetGroupCourses(id);
            setCourses(data);
        };
        fetchData();
    }, [id, location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveCourse = async () => {
        // Отправка данных на сервер или другая логика сохранения курса
        console.log('Создание курса:', formData);
        // Закрытие модального окна
        setShowModal(false);
    };

    const renderCourseCard = (course) => {
        const { id, name, startYear, semester, maximumStudentsCount, remainingSlotsCount, status } = course;
        const statusColor = {
            Started: 'green',
            OpenForAssigning: 'blue',
            Finished: 'red',
            Created: 'grey'
        };

        return (
            <Row key={id} className='mt-2'>
                <Col key={id} className='align-items-start justify-content-start'>
                    <Card>
                        <Card.Body>
                            <Card.Text style={{ fontSize: '1rem' }}>
                                <Row className=''>
                                    <div className='col-9'>
                                        <h5 style={{ fontSize: '1.3rem' }}>{name}</h5>
                                    </div>
                                    <div className='col-3 justify-content-end align-items-end d-flex mb-auto'>
                                        <span style={{ color: statusColor[status] }}>{status}</span>
                                    </div>
                                </Row>
                                <span>Учебный год - </span>{startYear}-{startYear + 1}
                                <br />
                                <span>Семестр - </span>{semester}
                                <br />
                                <span style={{ color: 'grey' }}>Мест всего - </span>{maximumStudentsCount}
                                <br />
                                <span style={{ color: 'grey' }}>Мест свободно - </span>{remainingSlotsCount}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <>
        <Col className='container-md col-md-9 align-items-start justify-content-start'>
            <h2 className="ms-3">Группа - {groupName}</h2>
            <Button className="mt-3 ms-3" onClick={() => setShowModal(true)}>Создать новый курс</Button>
            <Row className="mt-2 ms-auto">
                {courses.map(renderCourseCard)}
            </Row>
        </Col>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Создать новый курс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Название курса</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formStartYear">
                        <Form.Label>Год начала курса</Form.Label>
                        <Form.Control type="number" name="startYear" value={formData.startYear} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formMaximumStudents">
                        <Form.Label>Общее количество мест</Form.Label>
                        <Form.Control type="number" name="maximumStudentsCount" value={formData.maximumStudentsCount} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formSemester">
                        <Form.Label>Семестр</Form.Label>
                        <Form.Check
                            inline
                            label="Осенний"
                            type="checkbox"
                            id="autumn"
                            name="semester"
                            value="Autumn"
                            checked={formData.semester === "Autumn"}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            inline
                            label="Весенний"
                            type="checkbox"
                            id="spring"
                            name="semester"
                            value="Spring"
                            checked={formData.semester === "Spring"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRequirements">
                        <Form.Label>Требования</Form.Label>
                        <Form.Control as="textarea" rows={3} name="requirements" value={formData.requirements} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formAnnotations">
                        <Form.Label>Аннотации</Form.Label>
                        <Form.Control as="textarea" rows={3} name="annotations" value={formData.annotations} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formMainTeacher">
                        <Form.Label>Основной преподаватель курса</Form.Label>
                        <Form.Control as="select" name="mainTeacherId" value={formData.mainTeacherId} onChange={handleInputChange}>
                            <option value="">Выберите преподавателя</option>
                            {/* Здесь вы можете добавить варианты для выбора из списка */}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                <Button variant="primary" onClick={handleSaveCourse}>Создать</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CoursesList;
