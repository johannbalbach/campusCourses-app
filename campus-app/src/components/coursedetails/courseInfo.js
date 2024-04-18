import React, { useState, useEffect} from 'react';
import { Row, Col, Card, Container, Button, Modal } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import {connect} from 'react-redux';
import coursesApi from '../../api/coursesApi';
import CourseDetails from './courseDetails';
import CourseCard from './courseCard';
import CourseMembers from './courseMembers';
import myCoursesApi from '../../api/myCoursesApi';
import EditCourseModal from '../shared/Modals/EditCourseModal';
import EditCourseAdminModal from '../shared/Modals/EditCourseAdminModal';


const CourseInfo = ({userRole, isAdmin}) => {
    const { id } = useParams();
    const [course, setCourse] = useState();
    const [isCourseTeacher, setIsCourseTeacher] = useState(false);
    const [IsSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await coursesApi.getCourseDetails(id);

            setCourse(data);
            if (userRole === 'teacher'){
                const teaching = await myCoursesApi.teaching();
                teaching.some((course) => course.id === id) ? setIsCourseTeacher(true) : setIsCourseTeacher(false);
            }
            if (userRole === 'student'){
                const subscribed = await myCoursesApi.subscribed();
                subscribed.some((course) => course.id === id) ? setIsSubscribed(true) : setIsSubscribed(false);
            }
        };
        
        fetchData();
    }, [id, userRole, isCourseTeacher, isAdmin, IsSubscribed]);


    const [showEditCourseModal, setShowEditCourseModal] = useState(false);
    const handleModalClose = () => setShowEditCourseModal(false);
    const [showEditAdminCourseModal, setShowEditAdminCourseModal] = useState(false);
    const handleAdminModalClose = () => setShowEditAdminCourseModal(false);

    const handleModalOpen = () => {
        if (isAdmin){
            console.log("SMTH");
            setShowEditAdminCourseModal(true);
        }
        if (isCourseTeacher && !isAdmin)
        {
            console.log("HUINZ");
            setShowEditCourseModal(true);
        }
    }

    

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

                    <CourseDetails course={course} isPrivileged={isAdmin || isCourseTeacher} IsSubscribed={IsSubscribed}/>
                    <CourseCard body ={course} isPrivileged={isAdmin || isCourseTeacher}/>
                    <CourseMembers members ={course} isPrivileged={isCourseTeacher} isAdmin={isAdmin} IsSubscribed={IsSubscribed}/>
                </div>


                {((isAdmin) && (<EditCourseAdminModal data={course} showModal={showEditAdminCourseModal} handleCloseModal={handleAdminModalClose}/>)) ||
                ((isCourseTeacher && !isAdmin) && (<EditCourseModal data={course} showModal={showEditCourseModal} handleCloseModal={handleModalClose}/>))}
                </>
            ):(
                <a>Загрузка информации....</a>
            )
            }
        </Container>
    );
  };

const mapStateToProps = state => ({
    userRole: state.userRole,
    isAdmin: state.isAdmin
});

export default connect(mapStateToProps)(CourseInfo);
