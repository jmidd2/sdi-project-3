import React from 'react';

const SignUp = () => {

    const handleSignup = () => {
        const un = document.getElementById('un').value
        const pw = document.getElementById('pw').value
        console.log(un);
        // fetch backend with plaintext username and password
        // let response = await fetch('http://localhost:3001/user/signup', {
        //     method: "POST",
        //     body: JSON.stringify({un, pw})
        // });
        // let data = await response.json();
        // console.log(data);

        fetch('http://localhost:3001/user/signup', {
            method: "POST",
            body: JSON.stringify({un, pw})
        })
            .then(res => res.json())
            .then(data => console.log(data))
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