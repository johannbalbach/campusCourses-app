import React, { useState, useEffect} from 'react';
import { Row, Col, Card, Container, Button, Modal } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import {connect} from 'react-redux';
import coursesApi from '../../api/coursesApi';
import CourseDetails from './courseDetails';
import CourseCard from './courseCard';
import CourseMembers from './courseMembers';
import myCoursesApi from '../../api/myCoursesApi';
import EditCourseModal from './Modals/EditCourseModal';


const CourseInfo = ({userRole, isAdmin}) => {
    const { id } = useParams();
    const [course, setCourse] = useState();
    const [isCourseTeacher, setIsCourseTeacher] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await coursesApi.getCourseDetails(id);

            setCourse(data);
            console.log(data);
            if (userRole === 'teacher'){
                const teaching = await myCoursesApi.teaching();
                teaching.some((course) => course.id === id) ? setIsCourseTeacher(true) : setIsCourseTeacher(false);
            }
        };
        
        fetchData();
    }, [id, userRole, isCourseTeacher, isAdmin]);


    const [showEditCourseModal, setShowEditCourseModal] = useState(false);
    const handleModalClose = () => setShowEditCourseModal(false);
    const handleModalOpen = () => setShowEditCourseModal(true);

    // const [modalState, setModalState] = useState({
    //     showEditCourseModal: false,
    //     showEditStatusModal: false,
    //     showCreateNotificationModal: false,
    //     showAddTeacherModal: false,
    //     showEditMarkModal: false
    // });
    
    // const handleModalToggle = (modalName, isOpen) => {
    //     console.log(modalName, isOpen);
    //     setModalState(prevState => ({
    //         ...prevState,
    //         [modalName]: isOpen
    //     }));
    // };

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
                        {(isAdmin || isCourseTeacher) && (
                            <Button style={{borderRadius: '0'}} variant="warning" className="mt-3" onClick={handleModalOpen}>
                                РЕДАКТИРОВАТЬ
                            </Button>
                        )}
                    </Col>
                    </Row>

                    <CourseDetails course={course} isPrivileged={isAdmin || isCourseTeacher}/>
                    <CourseCard body ={course} isPrivileged={isAdmin || isCourseTeacher}/>
                    <CourseMembers members ={course} isPrivileged={isAdmin || isCourseTeacher}/>
                </div>


                {(isAdmin || isCourseTeacher) && <EditCourseModal data={course} showModal={showEditCourseModal} handleCloseModal={handleModalClose}/>}
                </>
            ):(
                <a>Загрузка информации....</a>
            )
            }
        </Container>
    );
  };

const mapStateToProps = state => ({
    userRole: state.userRole
});

export default connect(mapStateToProps)(CourseInfo);
