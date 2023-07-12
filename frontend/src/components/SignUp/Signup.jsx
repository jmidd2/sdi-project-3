import React, {useContext, useEffect} from 'react';
import { AppContext } from '../AppLayout/AppLayout';
import { useNavigate } from 'react-router-dom'
import './SignUp.scss';
import 'bootstrap/dist/css/bootstrap.css';
// import {CardGroup, Card} from 'react-bootstrap'

const SignUp = () => {
    const navigate = useNavigate()
    const {isLoggedIn ,setIsLoggedIn} = useContext(AppContext)

    useEffect(() => {
        if(isLoggedIn) {
            navigate('/')
        }
    }, [])

    const handleSignup = async () => {
        const un = document.getElementById('un').value
        const pw = document.getElementById('pw').value
        // fetch backend with plaintext username and password
        let response = await fetch('http://localhost:3001/user/signup', {
            method: "POST",
            body: JSON.stringify({un, pw}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let token = await response.json();
        if (token) {
            // store token in cookie
            // document.cookie = `username=${un}; max-age=3600`;
            document.cookie = `token=${token}; max-age=3600`;
            // set some state for logged in to true?
            setIsLoggedIn(true)
            // navigate to /home page
            navigate('/rental-details')
        } else {
            alert('User already exists. Please return to login or try a new user.')
        }
    }

    return (
        <div className='SignupContainer'>
            <h2>Create New User</h2>
            <input className='username' type="text" id='un' placeholder='Username...'/>
            <input className='password' type="password" id='pw' placeholder='Password...'/>
            <button className='btn btn-success' onClick={() => handleSignup()}>Create Account</button>
        </div>
    )
}

export default SignUp;