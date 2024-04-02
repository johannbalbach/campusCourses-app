import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/shared/navbar';
import RegisterForm from './components/profile/registerForm';
import LoginForm from './components/profile/loginForm';
import ProfileForm from './components/profile/profileForm';
import {BrowserRouter as Router, Routes, Route, Link,} from 'react-router-dom';
import MainContent from './components/main';
import GroupsList from './components/groups/groupsList';
import CoursesList from './components/courses/coursesList';
import { GroupProvider } from './components/groups/groupContext';

function App() {
  return (
    <GroupProvider>
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
              <Route path="/groups" Component={GroupsList} />
              <Route path="/groups/:id" element={<CoursesList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GroupProvider>
  );
}
export default App;
