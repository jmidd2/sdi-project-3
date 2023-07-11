import {useState} from 'react';
import './ReservationList.scss';
import {Button, CardGroup, Card} from 'react-bootstrap';

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

  //Query for all reservations
  fetch('http://localhost:3001/reservations')
    .then((res)=>res.json())
    .then((data)=>{
      console.log((data))
      setReservations(data)
    })

  //Modify Reservation Logic
  const modifyRes = async () => {
    let response = await fetch('http://localhost:3001/reservations', {
      method: 'PUT',
      body: JSON.stringify({uid: customerId, put: pickUpTime, rt: returnTime, loc: location}),
      headers: {
        "Content-Type":"application/json"
      }
    })
  }

  //Cancel Reservation Logic
  const cancelRes = async () =>  {
    let response = await fetch('http://localhost:3001/reservations', {
      method: 'DELETE',
      body: JSON.stringify({ }),
      headers: {
        "Content-Type":"application/json"
      }
    })
  }
  
  

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
            <Button variant="danger" onClick={toggleModifying}>Cancel Changes</Button>
            <Button variant="success" onClick={modifyRes}>Submit Changes</Button>
          </>
        }
      </Card>
    </CardGroup>
    </div>
  )
}

export default ReservationList;