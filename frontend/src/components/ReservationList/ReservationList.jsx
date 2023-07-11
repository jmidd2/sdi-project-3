import {useState} from 'react';
import './ReservationList.scss';
import {Button, CardGroup, Card} from 'react-bootstrap';
import cookie from 'cookie';

const ReservationList = () => {
  const [isModifying, setIsModifying] = useState(false);
  const [pickUpTime, setPickUpTime] = useState();
  const [returnTime, setReturnTime] = useState();
  const [location, setLocation] = useState();
  const [reservations, setReservations] = useState([]);
  
  const customerId = 1; //Replace with logged-in user
  
  const toggleModifying = () => {
    setIsModifying((prevState) => !prevState)
    console.log(isModifying);
  }

  const tokenCookie = () => {
    return document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
  }

  //Query for all reservations
  fetch('http://localhost:3001/reservation')
    .then((res)=>res.json())
    .then((rentals)=>{
      // setReservations(rentals.filter((rental)=>rental.))
      console.log(rentals)
    })  
  

  return (
    <div className="reservation-list" >
    <CardGroup>
      <Card>
        <Card.Title>Sample Reservation</Card.Title>
        {isModifying ? 
          <>
            <Button variant="success" onClick={toggleModifying}>Modify Reservations</Button>
            <Button variant="danger" onClick={cancelRes}>Cancel Reservation</Button>
          </> :
          <>
            <div className="form-group">
              <label htmlFor="pick-up-time">Pick-up Time:</label>
              <input type="datetime-local" id="pickup-time" className="pickup-time"/>
            </div>
            <div className="form-group">
              <label htmlFor="return-time">Return Time:</label>
              <input type="datetime-local" id="return-time" className="return-time"/>
            </div>
            <div className="form-action-buttons">
            <Button variant="danger" onClick={toggleModifying}>Cancel Changes</Button>
            <Button variant="success" onClick={modifyRes}>Submit Changes</Button>
            </div>
          </>
        }
      </Card>
    </CardGroup>
    </div>
  )
}

export default ReservationList;