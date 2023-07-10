import React, { useState, useEffect, useContext } from 'react';
import './RentalDetails.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import { appContext } from '../App/App';

const RentalDetails = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(appContext);
  const [locations, setLocations] = useState([])
  const [pickUpTime, setPickUpTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [tanksLoaded, setTanksLoaded] = useState([])

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    let queryString = '';
    formData.forEach((value, key) => {
      queryString += `${key}=${encodeURIComponent(value)}&`;
    })
    // TODO: CHANGE THIS ADDRESS WHEN JON ISNT HOSTING!!!!
    let response = await fetch(`http://localhost:3001/rentals/search?${queryString}`);
    // console.log(await response.json());
    let data = await response.json();

    setTanksLoaded(data);

  }

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn])

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      // TODO: CHANGE THIS ADDRESS WHEN JON ISNT HOSTING!!!!
      const response = await fetch('http://localhost:3001/locations/');
      if (!ignore) {
        // set locations
        let data = await response.json()
        setLocations(data)
      }
    }
    
    fetchData()
    // make sure to catch any error
    .catch(console.error);

    return () => { ignore = true; }
    
  },[])

  return (
    //Conditional Render Here
    <div className="main-container">
      <nav className="Header">
        <div className="logo">Logo</div>
        <div className="Reservation">Reservation</div>
      </nav>

      <form onSubmit={handleSubmit} className="main-reservation-container">
        <h2>Rental Tank Homepage</h2>

        <div className="location-main-dropdown">
          <label htmlFor="location">Choose a city:</label>
          <select id="location" name="location" value={selectedCity} onChange={handleCityChange}>
            <option key={0} value="">Select City</option>
            {locations?.map(loc => (<option key={loc.location_id} value={loc.location_id}>{loc.city}</option>))}
          </select>
          {selectedCity && <p>Selected City: {selectedCity}</p>}
        </div>

        <div id="pickup-return-form">
          <label htmlFor="pickUpTime">Pick-up Time:</label>
          <input type="datetime-local" id="pickUpTime" name="pickUpTime" /><br />

          <label htmlFor="returnTime">Return Time:</label>
          <input type="datetime-local" id="returnTime" name="returnTime" /><br />
        </div>

        <div id="box-container">
          <input type="radio" id="budget" name="tier" className="box" value="Budget"/>
          <label htmlFor="budget">Budget</label>
          <input type="radio" id="premium" name="tier" className="box" value="Premium"/>
          <label htmlFor="premium">Premium</label>
          <input type="radio" id="luxury" name="tier" className="box" value="Luxury"/>
          <label htmlFor="luxury">Luxury</label>
        </div>


        <button id="browse-button" type="submit">Browse Vehicle</button>
      </form>
      {tanksLoaded?.length > 0 ? (
        <>
          {tanksLoaded.map(item => 
            <div key={item.tank_id}>{item.model}</div>
          )}
        </>
      ) : (<>No Vehicles Found</>)}
    </div>
  );
};


export default RentalDetails; 