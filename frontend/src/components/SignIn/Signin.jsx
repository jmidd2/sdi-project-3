import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Container, Card} from 'react-bootstrap';

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const background = 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80';

  const handleLogin = () => {
    setUsername(document.getElementById('un').value)
    setPassword(document.getElementById('pw').value)
    // fetch to backend with plaintext un and pw

  }

  const handleSignup = () => {
    setUsername(document.getElementById('un').value)
    setPassword(document.getElementById('pw').value)
    navigate('/signup')
  }

  return (
    <div style={{backgroundImage:`url(${background})`, backgroundSize: 'cover'}}>
      <Container className="bg-image d-flex flex-column justify-content-center align-items-center vh-100">
        <Card className="mb-5 d-flex flex-column align-items-left rounded bg-secondary bg-white shadow-lg w-25 p-2 m-3">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
          <div className='row justify-content-center form-floating mb-2 w-100 px-3'>
              <input className='' type='text' placeholder='Username' id="un"/>
          </div>
          <div className='row justify-content-center mb-2 w-100 px-3'>
              <input className='mb-3' type='password' placeholder='Password' id="pw"/>
          </div>
          <Button className='mb-5 w-50' variant="success" onClick={() => handleLogin()}>Log In</Button> {/* On click check un/pw against DB and set session data*/}
          <Button className='w-50' variant="success" onClick={() => handleSignup()}>Sign Up</Button> {/* On click navigate to Sign Up page*/}
        </Card>
        <Container className='d-flex justify-content-center'>
          <Button type="button" variant="success" onClick={()=>navigate('/tanks')}>Vehicle Inventory</Button>
        </Container>
      </Container>
    </div>
  )
}


export default SignIn;