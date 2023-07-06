import React from 'react';
import './App.scss';
import Header from '../Header/Header';
import SignIn from '../SignIn/Signin';

const App = () => (
  <>
    <Header />
    <SignIn />
    <button type="button">Vehicle Inventory</button>
  </>
);

export default App;
