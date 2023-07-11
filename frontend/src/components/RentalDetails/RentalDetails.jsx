import React, { useState, useEffect, useContext } from 'react';
import './RentalDetails.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Container, Card} from 'react-bootstrap';
import RentalSearch from '../RentalSearch/RentalSearch';
import RentalVehicles from '../RentalVehicles/RentalVehicles';
import { Link, useNavigate } from 'react-router-dom';
import { appContext } from '../App/App';

const RentalDetails = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(appContext);
  const [pickUpTime, setPickUpTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [tanksLoaded, setTanksLoaded] = useState([])

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn])

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

  return (
    //Conditional Render Here on tanksLoaded
    <Container className="d-flex">
      <div className="main-container">
      {tanksLoaded.length ? <RentalVehicles vehicleList={tanksLoaded} /> : <RentalSearch  handleSubmit={handleSubmit} selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>}
      </div>
    </Container>
  )
}

export default RentalDetails;
