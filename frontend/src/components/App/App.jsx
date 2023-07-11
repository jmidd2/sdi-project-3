import React, {useState, createContext} from 'react';
import './App.scss';
import Header from '../Header/Header';
import SignIn from '../SignIn/Signin';
import SignUp from '../SignUp/Signup';
import RentalDetails from '../RentalDetails/RentalDetails';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ReservationList from '../ReservationList/ReservationList';

export const appContext = createContext()

const tokenCookie = () => {
  return document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] ? true : false
}

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(tokenCookie())

  return (
    <appContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <Header />
      <Router>
        <Routes>  
          <Route path='/' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/rental-details' element={<RentalDetails />} />
          <Route path='/tanks' element={<div>Tanks Placeholder</div>}/>
          <Route path='/tanks/:id' element={<div>Specific Tank Placeholder</div>} />
          <Route path='/reservations' element={<ReservationList  />}/>
          <Route path='/reservations/:id'element={<div>Specific Reservation Placeholder</div>}/>
        </Routes>
      </Router>
    </appContext.Provider>
  )

  }

export default App;
