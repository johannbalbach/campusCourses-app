import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <div className="App">
      <div>
        <NavBar/>
      </div>
      <main>
        <RegisterForm />
      </main>
    </div>
  );
}
export default App;
