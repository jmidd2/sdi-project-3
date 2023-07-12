import { useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';

const ResCard = ({
  start_date,
  end_date,
  location,
  vehicleInfo,
  reservation,
  token,
  setRefresh,
}) => {
  const [isModifying, setIsModifying] = useState(false);
  const [editStartDate, setEditStartDate] = useState(start_date.slice(0, -8));
  const [editEndDate, setEditEndDate] = useState(end_date.slice(0, -8));
  const startDateBeforeEdit = useRef();
  const endDateBeforeEdit = useRef();

  const toggleModifying = e => {
    if (!isModifying) {
      startDateBeforeEdit.current = editStartDate;
      endDateBeforeEdit.current = editEndDate;
    } else {
      setEditEndDate(endDateBeforeEdit.current);
      setEditStartDate(startDateBeforeEdit.current);
    }
    setIsModifying(prevState => !prevState);
  };

  const handleStartDateChange = e => {
    setEditStartDate(e.target.value);
  };
  const handleEndDateChange = e => {
    setEditEndDate(e.target.value);
  };

  const handleDelete = async (e, resDetails) => {
    const confirm = window.confirm(`Delete ${resDetails.model}?`);
    if (confirm) {
      // send fetch delete with token to /rental/reservation with id in query
      let delRes = await fetch(
        `http://localhost:3001/rentals/reservation/${resDetails.contract_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (delRes.status !== 200) {
        throw new Error(
          `Deleting failed with code ${delRes.status}: ${delRes.statusText}`
        );
      }

      setRefresh(true);
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let payload = {};

    for (const item of formData.entries()) {
      payload[item[0]] = item[1];
    }

    // send fetch delete with token to /rental/reservation with id in query
    let editRes = await fetch(
      `http://localhost:3001/rentals/reservation/${formData.get('contractId')}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (editRes.status !== 200) {
      throw new Error(
        `Editing failed with code ${editRes.status}: ${editRes.statusText}`
      );
    }
    setIsModifying(false);
    setRefresh(true);
  };

  const handleImg = vehicle => {
    if (vehicle.model.includes('M1A1')) {
      return 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80';
    } else if (vehicle.model.includes('Ravager')) {
      return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9abf1fec-c2c8-4387-91e2-8af03bc0d83e/df1700w-45eeedbd-df9e-4057-b4f6-30c936bd5377.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhYmYxZmVjLWMyYzgtNDM4Ny05MWUyLThhZjAzYmMwZDgzZVwvZGYxNzAwdy00NWVlZWRiZC1kZjllLTQwNTctYjRmNi0zMGM5MzZiZDUzNzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wQKDbQFDOsRBdtwRq38wYubljMp-qNvQF1uPHCLx-ws';
    } else if (vehicle.model.includes('Power Wheels')) {
      return 'https://i5.walmartimages.com/asr/48a76178-44a8-4ce8-b390-806293c92b5e.3221e739d36dedaf7d89546e144f771a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF';
    }
  };

  return (
    <Card className='mx-auto'>
      <Card.Title>
        Reservation #{reservation.contract_id}
        <div className='btn-group ms-3'>
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={toggleModifying}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-pencil-fill'
              viewBox='0 0 16 16'
            >
              <path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'></path>
            </svg>
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={e => {
              handleDelete(e, reservation);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-trash3'
              viewBox='0 0 16 16'
            >
              <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'></path>
            </svg>
          </button>
        </div>
      </Card.Title>
      <div>Vehicle: {vehicleInfo?.model}</div>
      <div>
        Location: {location?.city}, {location?.country}
      </div>
      <div>Price: {vehicleInfo?.price}</div>
      <img
        className='tankImg'
        src={handleImg(vehicleInfo)}
        alt=''
      />
      <form onSubmit={e => handleUpdate(e)}>
        <input
          type='hidden'
          value={reservation?.rental_origin}
          name='locationId'
        ></input>
        <input
          type='hidden'
          value={reservation?.contract_id}
          name='contractId'
        ></input>
        <div className='form-group'>
          <label
            className='form-label'
            htmlFor='pick-up-time'
          >
            Pick-up Time:
          </label>
          <input
            type='datetime-local'
            id='pickup-time'
            name='startDate'
            className='form-control'
            value={editStartDate}
            disabled={!isModifying}
            onChange={handleStartDateChange}
          />
        </div>
        <div className='form-group'>
          <label
            className='form-label'
            htmlFor='return-time'
          >
            Return Time:
          </label>
          <input
            type='datetime-local'
            id='return-time'
            name='endDate'
            className='form-control'
            value={editEndDate}
            disabled={!isModifying}
            onChange={handleEndDateChange}
          />
        </div>
        {isModifying && (
          <div className='form-action-buttons'>
            <Button
              variant='danger'
              onClick={toggleModifying}
            >
              Cancel Changes
            </Button>
            <Button
              variant='success'
              type='submit'
            >
              Submit Changes
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default ResCard;
