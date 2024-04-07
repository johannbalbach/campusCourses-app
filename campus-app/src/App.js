import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/shared/navbar';
import RegisterForm from './components/profile/registerForm';
import LoginForm from './components/profile/loginForm';
import ProfileForm from './components/profile/profileForm';
import {BrowserRouter as Router, Routes, Route, Link,} from 'react-router-dom';
import MainContent from './components/main';
import GroupsList from './components/groups/groupsList';
import GroupCourses from './components/courses/groupCourses';
import MyCourses from './components/courses/myCourses';
import TeachingCourses from './components/courses/teachingCourses';
import { GroupProvider } from './components/groups/groupContext';
import CourseInfo from './components/courses/courseInfo';

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
              <Route path="/groups/:id" Component={GroupCourses} />
              <Route path="/courses/my" Component={MyCourses} />
              <Route path="/courses/teaching" Component={TeachingCourses}/>
              <Route path="/courses/:id" Component={CourseInfo}/>
            </Routes>
          </main>
        </div>
      </Router>
    </GroupProvider>
  );
}
export default App;
