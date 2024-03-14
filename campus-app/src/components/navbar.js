import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavItem, NavLink, NavDropdown } from 'react-bootstrap';
import profileApi from '../api/profileApi';
import myCoursesApi from '../api/myCoursesApi';

const NavBar = () => {
    const [authenticated, setAuthenticated] = useState(false); // Состояние для отслеживания аутентификации пользователя
    const [userRole, setUserRole] = useState(null); // Состояние для отслеживания роли пользователя (non-authorize, студент, преподаватель, комбо)
    const [userName, setUserName] = useState(null);

    const handleLogout = async () => {
      await profileApi.logout();

      setAuthenticated(false);
      setUserRole(null);
    };
  
    const checkUserRole = async () => {
        const profile = await profileApi.getProfile();
        
        if (profile == null){
            setUserRole(null);
            return;
        }
        setUserName(profile.FullName);

        const subscribed = await myCoursesApi.subscribed();
        const teaching = await myCoursesApi.teaching();
        if (profile == null){
            setUserRole(null);
            return;
        }
    };
  
    useEffect(() => {
        const fetchData = async () => {
          await checkUserRole();
        };

        const token = localStorage.getItem('token');
        if (token != null){
            setAuthenticated(true);
        }
        
        fetchData();
      }, []);

    return (
        <Navbar bg="secondary" expand="lg" className="align-top p-3 mb-3 mt-0">
        <Container fluid>
            <Navbar.Brand href="#" className="h-25 ms-5 text-white">Кампусные курсы</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
                {authenticated && userRole !== null && (
                <>
                    {userRole === 0 && (
                    <NavItem>
                        <NavLink href="/communities" className='text-white'>Мои курсы</NavLink>
                    </NavItem>
                    )}
                    {userRole === 1 && (
                    <NavItem>
                        <NavLink href="/post/create"className='text-white'>Преподаваемые курсы</NavLink>
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