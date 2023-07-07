import React from 'react';

const SignUp = () => {

    const handleSignup = () => {
        const un = document.getElementById('un').value
        const pw = document.getElementById('pw').value
        // fetch backend with plaintext username and password
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