import {useState, useEffect, useContext, useRef} from 'react';
import './ReservationList.scss';
import {Button, CardGroup, Card} from 'react-bootstrap';
import cookie from 'cookie';
import { AppContext } from '../AppLayout/AppLayout';
import { useNavigate } from 'react-router-dom';

const ReservationList = () => {
  const navigate = useNavigate()
  const [isModifying, setIsModifying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pickUpTime, setPickUpTime] = useState();
  const [returnTime, setReturnTime] = useState();
  const [location, setLocation] = useState();
  const [reservations, setReservations] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  
  const customerId = 1; //Replace with logged-in user
  
  const toggleModifying = () => {
    setIsEditing(false);
    setIsModifying((prevState) => !prevState)
    console.log(isModifying);
  }

  let token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1]


/**

      let response = await fetch('http://localhost:3001/rentals/reservation', {
            method: "POST",
            body: JSON.stringify({...resDetails, ...vehicle}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
 */

  useEffect(() => {
    if(isLoggedIn === false) {
      navigate('/');
    }
  }, [isLoggedIn])

  //Query for all reservations
  useEffect(() => {
    const makeReq = async () => {
      let response = await fetch('http://localhost:3001/rentals/reservation', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      let data = await response.json();
      console.log(data)
      setReservations(data);
    }
    makeReq();
  }, [])
  
  const ResCard = ({start_date, end_date, location}) => {
    return (
    <Card>
        <Card.Title>Sample Reservation<span><a onClick={(e) => {e.preventDefault(); setIsEditing(!isEditing);}} href='#'>Edit</a></span></Card.Title>
        {isEditing ? 
          <>
            <Button variant="success" onClick={toggleModifying}>Modify Reservations</Button>
            <Button variant="danger" onClick={()=>{}}>Cancel Reservation</Button>
          </> :
          <>
            <div>Location: {location?.city}, {location?.state}</div>
            <div className="form-group">
              <label htmlFor="pick-up-time">Pick-up Time: {start_date}</label>
              <input type="datetime-local" id="pickup-time" className="pickupTime" value={start_date.slice(0,-8)} disabled={!isModifying} />
            </div>
            <div className="form-group">
              <label htmlFor="return-time">Return Time: {end_date}</label>
              <input type="datetime-local" id="return-time" className="returnTime" value={end_date.slice(0,-8)} disabled={!isModifying} />
            </div>
            {isModifying && <div className="form-action-buttons">
            <Button variant="danger" onClick={toggleModifying}>Cancel Changes</Button>
            <Button variant="success" onClick={()=>{}}>Submit Changes</Button>
            </div>}
          </>
        }
      </Card>
    );
  }  


  return (
    <div className="reservation-list">
    <CardGroup>
      {reservations?.map((reservation)=>(
      <ResCard 
        start_date={reservation?.start_date}
        end_date={reservation?.end_date}
        location={{city: reservation?.city, country: reservation?.country, state: reservation?.state}}
      />
      ))}
    </CardGroup>
    </div>
  )
}

export default ReservationList;