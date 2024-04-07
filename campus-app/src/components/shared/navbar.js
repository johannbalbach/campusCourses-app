import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavItem, NavLink, NavDropdown } from 'react-bootstrap';
import profileApi from '../../api/profileApi';
import myCoursesApi from '../../api/myCoursesApi';

const NavBar = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('non'); // (non, user, student, teacher, combo)
    const [userName, setUserName] = useState(null);

    const handleLogout = async () => {
        await profileApi.logout();

        setAuthenticated(false);
        setUserRole('non');
    };
  
    const checkUserRole = async () => {
        const profile = await profileApi.getProfile();
        
        if (profile == null){
            setUserRole('non');
            setAuthenticated(false);
            return;
        }
        setAuthenticated(true);
        setUserName(profile.fullName);

        const subscribed = await myCoursesApi.subscribed();
        const teaching = await myCoursesApi.teaching();

        if (subscribed.length > 0 && teaching.length > 0) {
            setUserRole('combo');
        } else if (subscribed > 0) {
            setUserRole('student');
        } else if (teaching > 0) {
            setUserRole('teacher');
        } else {
            setUserRole('user');
        }
    };
  
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token') != null){
                await checkUserRole();
            }
        };
        
        fetchData();
      }, []);

    return (
        <Navbar bg="secondary" expand="lg" className="align-top p-3 mb-3 mt-0">
        <Container fluid>
            <Navbar.Brand href="#" className="h-25 ms-5 text-white">Кампусные курсы</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
                {authenticated && userRole !== 'non' && (
                <>
                    {userRole != 'non' && (
                    <NavItem>
                        <NavLink href="/groups" className='text-white'>Группы курсов</NavLink>
                    </NavItem>
                    )}
                    {(userRole == 'student' || userRole == 'combo') && (
                    <NavItem>
                        <NavLink href="/courses/my" className='text-white'>Мои курсы</NavLink>
                    </NavItem>
                    )}
                    {(userRole == 'teacher' || userRole == 'combo') && (
                    <NavItem>
                        <NavLink href="/courses/teaching"className='text-white'>Преподаваемые курсы</NavLink>
                    </NavItem>
                    )}
                </>
                )}
            </Nav>
            <Nav>
                {!authenticated ? (
                <NavItem>
                    <NavLink href="/register" className='text-white'>Регистрация</NavLink>
                </NavItem>
                ) : (
                <NavItem>
                    <NavLink href="/profile" className='text-white'> 
                    {userName}
                    </NavLink>
                </NavItem>
                )}
                {!authenticated ? (
                <NavItem>
                    <NavLink href="/login" className='text-white'>Вход</NavLink>
                </NavItem>
                ) : (
                <NavItem>
                    <NavLink id='logoutButton' onClick={handleLogout} className='text-white'>
                    Выйти
                    </NavLink>
                </NavItem>
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default NavBar;