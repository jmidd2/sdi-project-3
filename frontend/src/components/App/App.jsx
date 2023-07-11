import React, {useState, createContext} from 'react';
import './App.scss';
import AppLayout from '../AppLayout/AppLayout';
import SignIn from '../SignIn/Signin';
import SignUp from '../SignUp/Signup';
import RentalDetails from '../RentalDetails/RentalDetails';
import {BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import ReservationList from '../ReservationList/ReservationList';

  export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path='/' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/rental-details' element={<RentalDetails />} />
        <Route path='/tanks' element={<div>Tanks Placeholder</div>}/>
        <Route path='/tanks/:id' element={<div>Specific Tank Placeholder</div>} />
        <Route path='/reservations' element={<ReservationList  />}/>
        <Route path='/reservations/:id'element={<div>Specific Reservation Placeholder</div>}/>
      </Route>
  )
);
