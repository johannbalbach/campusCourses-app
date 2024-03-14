import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import ProfileForm from './components/profileForm';
import {BrowserRouter as Router, Routes, Route, Link,} from 'react-router-dom';
import MainContent from './components/main';
import CourseItem from './components/courseItem';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <NavBar/>
        </div>
        <main>
          <Routes>
            <Route path="/" Component={MainContent} />
            <Route path="/login" Component={LoginForm} />
            <Route path="/register" Component={RegisterForm} />
            <Route path="/profile" Component={ProfileForm} />
            <Route path="/groups" Component={CourseItem}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
