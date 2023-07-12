import React, { useState, useEffect, useContext } from 'react';
import './RentalDetails.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import RentalSearch from '../RentalSearch/RentalSearch';
import RentalVehicles from '../RentalVehicles/RentalVehicles';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppLayout/AppLayout';

const RentalDetails = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const [resDetails, setResDetails] = useState({});
  const [vehicleList, setVehicleList] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let queryString = '';
    let resDetailsObj = {};

    formData.forEach((value, key) => {
      queryString += `${key}=${encodeURIComponent(value)}&`;
      resDetailsObj[key] = value;
    });

    setResDetails({ ...resDetailsObj });
    // TODO: CHANGE THIS ADDRESS WHEN JON ISNT HOSTING!!!!
    let response = await fetch(
      `http://localhost:3001/rentals/search?${queryString}`
    );
    let data = await response.json();

    setVehicleList(data);
  };

  return (
    //Conditional Render Here on tanksLoaded
    <Container className='d-flex justify-content-center'>
      <div className='main-container col-8'>
        <RentalSearch handleSubmit={handleSubmit} />
        {vehicleList.length > 0 && (
          <RentalVehicles
            vehicleList={vehicleList}
            resDetails={resDetails}
          />
        )}
      </div>
    </Container>
  );
};

export default RentalDetails;
