import React, { useState, useEffect} from 'react';
import { Row, Col, Card, Container, Button, Modal } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import coursesApi from '../../api/coursesApi';
import CourseDetails from './courseDetails';
import CourseCard from './courseCard';
import CourseMembers from './courseMembers';

const CourseInfo = () => {
    const [course, setCourse] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [userRole, setUserRole] = useState('admin');
    const { id } = useParams();
  
    useEffect(() => {
        const fetchData = async () => {
            const data = await coursesApi.getCourseDetails(id);

            setCourse(data);

            console.log(data);
        };
        
        fetchData();
    }, [id]);
    
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalOpen = () => setShowEditModal(true);

    return (
        <Container className='container-md col-md-9 align-items-start justify-content-start'>
            {course ? (
                <>
                <h1 className="ms-auto mt-4">{course.name}</h1>
                <div>
                    <Row>
                    <Col className='col-10 mt-auto mb-auto'>
                        <h5 className="ms-auto">Основные данные курса</h5>
                    </Col>
                    <Col className='col-2 mb-2 ms-auto me-auto justify-content-end align-items-end d-flex'>
                        {userRole === 'admin' && (
                            <Button style={{borderRadius: '0'}} variant="warning" className="mt-3" onClick={handleEditModalOpen}>
                                Редактировать
                            </Button>
                        )}
                    </Col>
                    </Row>

                    <CourseDetails course={course} />
                    <CourseCard body ={course} />
                    <CourseMembers members ={course}/>
                </div>

                {/* Edit Course Modal (implementation omitted for brevity) */}
                <Modal show={showEditModal} onHide={handleEditModalClose}>
                {/* Modal content for editing course details */}
                </Modal>
                </>
            ):(
                <a>Загрузка информации....</a>
            )
            }
        </Container>
    );
  };
  
  export default CourseInfo;
