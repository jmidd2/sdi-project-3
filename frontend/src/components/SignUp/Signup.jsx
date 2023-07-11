import React, {useContext} from 'react';
import { appContext } from '../App/App';
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const {setIsLoggedIn} = useContext(appContext)

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
            document.cookie = `username=${un}; max-age=3600`;
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
        <>
        <div className='container bg-secondary'>
            <div className='row'>
                <input type="text" id='un' placeholder='Username...'/>
            </div>
            <div className='row'>
                <input type="password" id='pw' placeholder='Password...'/>
            </div>
            <div className='row'>
                <button onClick={() => handleSignup()}>Create Account</button>
            </div>
        </div>
        </>
    )
}

export default SignUp;