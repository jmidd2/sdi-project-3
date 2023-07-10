import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Container} from 'react-bootstrap';

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
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
    <>
        <div className='container bg-secondary'>
            <div className='row justify-content-center text-center'>
                <p className='col-6'>Login</p>
            </div>
            <div className='row justify-content-center'>
                <input className='col-4' type='text' placeholder='Username' id="un"/> 
            </div>
            <div className='row justify-content-center'>
                <input className='col-4' type='password' placeholder='Password' id="pw"/>
            </div>
            <div className='row justify-content-center'>
                <button className='col-2' onClick={() => handleLogin()}>Login</button> {/* On click check un/pw against DB and set session data*/}
                <button className='col-2' onClick={() => handleSignup()}>Sign Up</button> {/* On click navigate to Sign Up page*/}
            </div>
        </div> 

        <Container className='d-flex justify-content-center'>
          <Button type="button" variant="success" onClick={()=>navigate('/tanks')}>Vehicle Inventory</Button>
        </Container>
    </>
  )
}


export default SignIn;