import { useState, useEffect, useContext } from 'react';
import { CardGroup, Col } from 'react-bootstrap';
import ResCard from '../ResCard/ResCard';
import { AppContext } from '../AppLayout/AppLayout';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ReservationList.scss';

const ReservationList = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const { isLoggedIn } = useContext(AppContext);

  let token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/');
    }
  }, [isLoggedIn]);

  //Query for all reservations
  useEffect(() => {
    const makeReq = async () => {
      let response = await fetch('http://localhost:3001/rentals/reservation', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();

      setReservations(data);
      setRefresh(false);
    };
    if (refresh) {
      makeReq();
    }
    return () => setRefresh(false);
  }, [refresh]);

  return (
    <div className='reservation-list'>
      <CardGroup
        xs={1}
        md={2}
        className='g-4'
      >
        {reservations?.map(reservation => (
          <Col key={reservation.contract_id}>
            <ResCard
              start_date={reservation?.start_date}
              end_date={reservation?.end_date}
              location={{
                city: reservation?.city,
                country: reservation?.country,
                state: reservation?.state,
              }}
              vehicleInfo={{
                model: reservation?.model,
                price: reservation?.base_price,
              }}
              reservation={reservation}
              token={token}
              setRefresh={setRefresh}
            />
          </Col>
        ))}
      </CardGroup>
    </div>
  );
};

export default ReservationList;
