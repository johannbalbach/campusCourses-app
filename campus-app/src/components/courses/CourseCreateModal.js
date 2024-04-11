import React, { useState, useEffect} from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import groupsApi from '../../api/groupsApi';
import UserSelector from '../shared/userSelector';

const CourseCreateModal = ({showModal, handleCloseModal}) => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: '',
        startYear: '',
        maximumStudentsCount: '',
        semester: '',
        requirements: '',
        annotations: '',
        mainTeacherId: ''
    });
    const [allUsers, setAllUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isCountValid, setIsCountValid] = useState('true');
    const [isYearValid, setIsYearValid] = useState('true');

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['image', 'video'],
        ['code']
      ];


    useEffect(() => {
        const fetchData = async () => {
            const data = await groupsApi.userList();

            setAllUsers(data);
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangeWithValidation = (e) => {
        const { name, value, pattern } = e.target;
        setFormData({ ...formData, [name]: value });
        name == 'startYear' ? setIsYearValid(value.match(pattern)) : setIsCountValid(value.match(pattern));
    };

    const handleMainTeacher = (e) => {
        setFormData({ ...formData, 'mainTeacherId': e.value });
    }

    const handleSaveCourse = async (e) => {
        e.preventDefault();

        if (!isCountValid || !isYearValid) {
            return;
        }
        if (formData.semester == ''){
            return;
        }
        if (formData.annotations == '' || formData.requirements == ''){
            return;
        }

        await groupsApi.createCourse(id, formData);
        
        handleCloseModal(false);
    };


    return (
        <Modal show={showModal} onHide={() => handleCloseModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Создать новый курс</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveCourse}>
                <Modal.Body>
                    <Form.Group controlId="formName">
                        <Form.Label>Название курса</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formStartYear" className='mt-2'>
                        <Form.Label>Год начала курса</Form.Label>
                        <Form.Control type="number" name="startYear" value={formData.startYear} isInvalid={!isYearValid}
                            onChange= {handleInputChangeWithValidation} pattern="^(200[0-9]|201[0-9]|202[0-9])$" required/>
                        <Form.Control.Feedback type="invalid">
                            Год должен быть между 2000 и 2029.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formMaximumStudents" className='mt-2'>
                        <Form.Label>Общее количество мест</Form.Label>
                        <Form.Control type="number" name="maximumStudentsCount" value={formData.maximumStudentsCount} isInvalid={!isCountValid}
                            onChange={handleInputChangeWithValidation}  pattern="^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$" required/>
                        <Form.Control.Feedback type="invalid">
                            Количество студентов должно быть между 1 и 200.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formSemester" className='mt-2 mb-2'>
                        <Form.Label>Семестр</Form.Label>
                        <br></br>
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
                    <Form.Group controlId="formRequirements" className='mt-2'>
                        <Form.Label>Требования</Form.Label>
                        <ReactQuill name="requirements" value={formData.requirements}  onChange={(e) => {setFormData({ ...formData, 'requirements': e })}} modules={{ toolbar: toolbarOptions }}/>
                    </Form.Group>
                    <Form.Group controlId="formAnnotations" className='mt-2'>
                        <Form.Label>Аннотации</Form.Label>
                        <ReactQuill name="annotations" value={formData.annotations}  onChange={(e) => {setFormData({ ...formData, 'annotations': e })}} modules={{ toolbar: toolbarOptions }}/>
                    </Form.Group>
                    <UserSelector name="mainTeacherId" teachers={allUsers} onSelect={handleMainTeacher}></UserSelector>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal(false)}>Отмена</Button>
                    <Button variant="primary" type="submit">Создать</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CourseCreateModal;
