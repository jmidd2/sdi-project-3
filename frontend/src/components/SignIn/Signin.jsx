import React, { useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Container} from 'react-bootstrap';
import { appContext } from '../App/App';

const SignIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(appContext);

  const username = useRef('');
  const password = useRef('');

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn])

  const handleLogin = async () => {
    // fetch to backend with plaintext un and pw
    let response = await fetch('http://localhost:3001/user/signin', {
            method: "POST",
            body: JSON.stringify({un: username.current.value, pw: password.current.value}),
            headers: {
                "Content-Type": "application/json"
            }
        });
    if (response.status !== 200) {
      let message = await response.json();
      alert(message);
    }
    else {
      let token = await response.json();
      // store token in cookie
      document.cookie = `username=${username.current.value}; max-age=3600`;
      document.cookie = `token=${token}; max-age=3600`;
      // set some state for logged in to true?
      setIsLoggedIn(true);
      // navigate to /home page
      navigate('/home');
    }
  }

  const handleSignup = () => {
  //   setUsername(document.getElementById('un').value)
  //   setPassword(document.getElementById('pw').value)
    navigate('/signup');
  }

  
  return (
    <>
        <div className='container bg-secondary'>
            <div className='row justify-content-center text-center'>
                <p className='col-6'>Login</p>
            </div>
            <div className='row justify-content-center'>
                <input ref={username} className='col-4' type='text' placeholder='Username' id="un"/> 
            </div>
            <div className='row justify-content-center'>
                <input ref={password} className='col-4' type='password' placeholder='Password' id="pw"/>
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
  );
}


export default SignIn;