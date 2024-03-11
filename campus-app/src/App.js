import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';

function App() {
  return (
    <div className="App">
      <div>
        <NavBar/>
      </div>
      <main>
        <LoginForm />
      </main>
    </div>
  );
}
export default App;
