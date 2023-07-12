import React, { useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { AppContext } from '../AppLayout/AppLayout';
import {Button, Container, Card} from 'react-bootstrap';

const SignIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const username = useRef('');
  const password = useRef('');
  const background = 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80';

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/rental-details');
    }
  }, [isLoggedIn])

  const handleLogin = async () => {
    // fetch to backend with plaintext un and pw
    // TODO: CHANGE THIS ADDRESS WHEN JON ISNT HOSTING!!!!
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
      // document.cookie = `username=${username.current.value}; max-age=3600`;
      document.cookie = `token=${token}; max-age=3600`;
      // set some state for logged in to true?
      setIsLoggedIn(true);
      // navigate to /home page
      navigate('/rental-details');
    }
  }

  const handleSignup = () => {
  //   setUsername(document.getElementById('un').value)
  //   setPassword(document.getElementById('pw').value)
    navigate('/signup');
  }

  return (
    <div style={{backgroundImage:`url(${background})`, backgroundSize: 'cover'}}>
      <Container className="bg-image d-flex flex-column justify-content-center align-items-center vh-100">
        <Card className="mb-5 d-flex flex-column align-items-left rounded bg-secondary bg-white shadow-lg w-25 p-2 m-3">
          <h1 class="h3 mb-3 fw-normal">Please Sign In</h1>
          <div className='row justify-content-center form-floating mb-2 w-100 px-3'>
              <input ref={username} className='' type='text' placeholder='Username' id="un"/>
          </div>
          <div className='row justify-content-center mb-2 w-100 px-3'>
              <input ref={password} className='mb-3' type='password' placeholder='Password' id="pw"/>
          </div>
          <div className='d-flex row justify-content-around'>
            <Button className='w-25 mh-100' variant="success" onClick={() => handleLogin()}>Log In</Button> {/* On click check un/pw against DB and set session data*/}
            <Button className='w-25' variant="success" onClick={() => handleSignup()}>Sign Up</Button> {/* On click navigate to Sign Up page*/}
          </div>
        </Card>
        <Container className='d-flex justify-content-center'>
         {/* <Button type="button" variant="success" onClick={()=>navigate('/tanks')}>Vehicle Inventory</Button>*/}
        </Container>
      </Container>
    </div>
  )
}


export default SignIn;