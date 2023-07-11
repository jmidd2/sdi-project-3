import React, { useState, useEffect, useContext } from 'react';
import './RentalDetails.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Container, Card} from 'react-bootstrap';
import RentalSearch from '../RentalSearch/RentalSearch';
import RentalVehicles from '../RentalVehicles/RentalVehicles';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../App/App';

const RentalDetails = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(appContext);
  const [resDetails, setResDetails] = useState({});
  const [vehicleList, setVehicleList] = useState([])

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    let queryString = '';
    let resDetailsObj = {};

    formData.forEach((value, key) => {
      queryString += `${key}=${encodeURIComponent(value)}&`;
      resDetailsObj[key] = value;
    })

    setResDetails({...resDetailsObj});
    // TODO: CHANGE THIS ADDRESS WHEN JON ISNT HOSTING!!!!
    let response = await fetch(`http://localhost:3001/rentals/search?${queryString}`);
    // console.log(await response.json());
    let data = await response.json();

    setVehicleList(data);
  }

  return (
    //Conditional Render Here on tanksLoaded
    <Container className="d-flex">
      <div className="main-container">
      {vehicleList.length ? <RentalVehicles vehicleList={vehicleList} resDetails={resDetails} /> : <RentalSearch handleSubmit={handleSubmit} />}
      </div>
    </Container>
  )
}

export default RentalDetails;
