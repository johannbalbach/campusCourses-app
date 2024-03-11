import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import ProfileForm from './components/profileForm';

function App() {
  return (
    <div className="App">
      <div>
        <NavBar/>
      </div>
      <main>
        <ProfileForm/>
      </main>
    </div>
  );
}
export default App;
