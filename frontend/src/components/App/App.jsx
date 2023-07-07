import React from 'react';
import './App.scss';
import Header from '../Header/Header';
import SignIn from '../SignIn/Signin';
import SignUp from '../SignUp/Signup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => (
  <>
    <Header />
    <Router>
      <Routes>  
        <Route path='/' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='tanks' element={<div>Tanks Placeholder</div>}/>
      </Routes>
    </Router>
  </>
);

export default App;
