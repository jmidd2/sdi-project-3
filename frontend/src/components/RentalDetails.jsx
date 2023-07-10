/*import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const homepage = () => {
  const [pickUpTime, setPickUpTime] = useState('');
  const [returnTime, setReturnTime] = useState('');

  return (
    <div className="main-container">
      <nav className="Header">
        <div className="logo">Logo</div>
        <div className="Reservation">Reservation</div>
      </nav>

      <div className="main-reservation-container">
        <h2>Rental Tank Homepage</h2>

        <form id="pickup-return-form">
          <label htmlFor="pick-up-time">Pick-up Time:</label>
          <input type="time" id="pick-up-time" required/><br/>

          <label htmlFor="return-time">Return Time:</label>
          <input type="time" id="return-time" required/><br/>
        </form>

        <div id="box-container">
          <div className="box">Budget</div>
          <div className="box">Premium</div>
          <div className="box">Luxury</div>
        </div>

        <button id="browse-button">Browse Vehicle</button>
        <Link to="/SignIn">Sign In</Link>
      </div>
    </div>
  );
};*/
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const RentalDetails = () => {
  const [pickUpTime, setPickUpTime] = useState('');
  const [returnTime, setReturnTime] = useState('');

  return (
    <div className="main-container">
      <nav className="Header">
        <div className="logo">Logo</div>
        <div className="Reservation">Reservation</div>
      </nav>

      <div className="main-reservation-container">
        <h2>Rental Tank Homepage</h2>

        <form id="pickup-return-form">
          <label htmlFor="pick-up-time">Pick-up Time:</label>
          <input type="time" id="pick-up-time" required/><br/>

          <label htmlFor="return-time">Return Time:</label>
          <input type="time" id="return-time" required/><br/>
        </form>

        <div id="box-container">
          <div className="box">Budget</div>
          <div className="box">Premium</div>
          <div className="box">Luxury</div>
        </div>

        <button id="browse-button">Browse Vehicle</button>
        <Link to="/SignIn">Sign In</Link>
      </div>
    </div>
  );
};



export default RentalDetails; 