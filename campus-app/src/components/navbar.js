import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavItem, NavLink, NavDropdown } from 'react-bootstrap';
import profileApi from '../api/profileApi';

const NavBar = () => {
    const [authenticated, setAuthenticated] = useState(false); // Состояние для отслеживания аутентификации пользователя
    const [userRole, setUserRole] = useState(null); // Состояние для отслеживания роли пользователя (non-authorize, студент, преподаватель, комбо)

    const handleLogout = async () => {
      await profileApi.logout();

      setAuthenticated(false);
      setUserRole(null);
    };
  
    // Функция для определения роли пользователя
    const checkUserRole = async () => {
        const profile = await profileApi.getProfile();
        
        if (profile == null){
            setUserRole(null);
        }

        setUserRole();
    };
  
    useEffect(() => {
        const fetchData = async () => {
          await checkUserRole();
        };
    
        fetchData();
      }, []);

    return (
        <Navbar bg="light" expand="lg" className="align-top shadow p-3 mb-3 mt-0">
        <Container fluid>
            <Navbar.Brand href="#" className="h-25 ms-5 ">Кампусные курсы</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
                {authenticated && userRole !== null && (
                <>
                    {userRole === 0 && (
                    <NavItem>
                        <NavLink href="/communities">Мои курсы</NavLink>
                    </NavItem>
                    )}
                    {userRole === 1 && (
                    <NavItem>
                        <NavLink href="/post/create">Преподаваемые курсы</NavLink>
                    </NavItem>
                    )}
                </>
                )}
            </Nav>
            <Nav>
                {!authenticated ? (
                <NavItem>
                    <NavLink href="/login">Вход</NavLink>
                </NavItem>
                ) : (
                <NavItem>
                    <NavLink href="/profile">
                    user113@example.com
                    </NavLink>
                    <NavLink id='logoutButton' onClick={handleLogout}>
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