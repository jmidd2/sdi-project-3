import React, { useState } from 'react';
import './RentalDetails.scss';
import 'bootstrap/dist/css/bootstrap.css';
import RentalSearch from '../RentalSearch/RentalSearch';
import RentalVehicles from '../RentalVehicles/RentalVehicles';
import { Link } from 'react-router-dom';

const RentalDetails = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [tanksLoaded, setTanksLoaded] = useState(false)

  return (
    //Conditional Render Here on tanksLoaded
    tanksLoaded ? <RentalVehicles /> : <RentalSearch selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>
  )
}

export default RentalDetails;