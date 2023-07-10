import React, { useState } from 'react';
import './RentalDetails.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const RentalDetails = () => {
  const [pickUpTime, setPickUpTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [tanksLoaded, setTanksLoaded] = useState(false)

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    //Conditional Render Here
    <div className="main-container">
      <nav className="Header">
        <div className="logo">Logo</div>
        <div className="Reservation">Reservation</div>
      </nav>

      <div className="main-reservation-container">
        <h2>Rental Tank Homepage</h2>

        <div className="location-main-dropdown">
          <label htmlFor="city">Choose a city:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select City</option>
            <option value="Kharkiv">Kharkiv</option>
            <option value="Kherson">Kherson</option>
            <option value="Kyiv">Kyiv</option>
            <option value="Odessa">Odessa</option>
          </select>
          {selectedCity && <p>Selected City: {selectedCity}</p>}
        </div>

        <form id="pickup-return-form">
          <label htmlFor="pick-up-time">Pick-up Time:</label>
          <input type="datetime-local" id="pick-up-time" required /><br />

          <label htmlFor="return-time">Return Time:</label>
          <input type="datetime-local" id="return-time" required /><br />
        </form>

        <div id="box-container">
          <input type="radio" id="budget" name="tier" className="box" value="Budget"/>
          <label for="budget">Budget</label>
          <input type="radio" id="premium" name="tier" className="box" value="Premium"/>
          <label for="premium">Premium</label>
          <input type="radio" id="luxury" name="tier" className="box" value="Luxury"/>
          <label for="luxury">Luxury</label>
        </div>


        <button id="browse-button">Browse Vehicle</button>
      </div>
    </div>
  );
};


export default RentalDetails; 