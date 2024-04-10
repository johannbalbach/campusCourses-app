import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { Navbar, Nav, Container, NavItem, NavLink} from 'react-bootstrap';
import profileApi from '../../api/profileApi';
import store from '../../store/store';
import updateUserRole from '../../store/actions/updateUserRole';
import updateIsAdmin from '../../store/actions/updateIsAdmin';

const NavBar = ({userRole}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userName, setUserName] = useState(null);

    const handleLogout = async () => {
        await profileApi.logout();

        setAuthenticated(false);
        store.dispatch(updateUserRole('non'));
    };
  
    const checkUserRole = async () => {
        const profile = await profileApi.getProfile();
        
        if (profile == null){
            store.dispatch(updateUserRole('non'));
            setAuthenticated(false);
            return;
        }
        setAuthenticated(true);
        setUserName(profile.fullName);

        const roles = await profileApi.getRole();

        if (roles.isTeacher && roles.isStudent) {
            store.dispatch(updateUserRole('combo'));
        } else if (roles.isStudent) {
            store.dispatch(updateUserRole('student'));
        } else if (roles.isTeacher) {
            store.dispatch(updateUserRole('teacher'));
        } else {
            store.dispatch(updateUserRole('user'));
        }

        store.dispatch(updateIsAdmin(roles.isAdmin));
    };
  
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token') != null){
                await checkUserRole();
                console.log(userRole);
            }
        };
        
        fetchData();
      }, [userRole]);

    return (
        <Navbar bg="secondary" expand="lg" className="align-top p-3 mb-3 mt-0">
        <Container fluid>
            <Navbar.Brand href="/" className="h-25 ms-5 text-white">Кампусные курсы</Navbar.Brand>
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

const mapStateToProps = state => ({
    userRole: state.userRole
});

export default connect(mapStateToProps)(NavBar);