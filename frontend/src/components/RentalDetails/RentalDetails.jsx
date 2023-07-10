import React, { useState, useEffect, useContext } from 'react';
import './RentalDetails.scss';
import 'bootstrap/dist/css/bootstrap.css';
import RentalSearch from '../RentalSearch/RentalSearch';
import RentalVehicles from '../RentalVehicles/RentalVehicles';
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
    //Conditional Render Here on tanksLoaded
    tanksLoaded ? <RentalVehicles /> : <RentalSearch selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>
  )
}

export default RentalDetails;
