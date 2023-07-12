import { useEffect, useState } from 'react';
import './RentalSearch.scss';
import { CardGroup, Card } from 'react-bootstrap';

const RentalSearch = ({ handleSubmit }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      // TODO: CHANGE THIS ADDRESS WHEN JON ISNT HOSTING!!!!
      const response = await fetch('http://localhost:3001/locations/');
      if (!ignore) {
        // set locations
        let data = await response.json();
        setLocations(data);
      }
    };

    fetchData()
      // make sure to catch any error
      .catch(console.error);

    return () => {
      ignore = true;
    };
  }, []);

  // const budgetImage =
  //   'https://i5.walmartimages.com/asr/48a76178-44a8-4ce8-b390-806293c92b5e.3221e739d36dedaf7d89546e144f771a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF';
  // const premiumImage =
  //   'https://images.unsplash.com/photo-1630161861535-b39e5635da68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80';
  // const luxuryImage =
  //   'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9abf1fec-c2c8-4387-91e2-8af03bc0d83e/df1700w-45eeedbd-df9e-4057-b4f6-30c936bd5377.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhYmYxZmVjLWMyYzgtNDM4Ny05MWUyLThhZjAzYmMwZDgzZVwvZGYxNzAwdy00NWVlZWRiZC1kZjllLTQwNTctYjRmNi0zMGM5MzZiZDUzNzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wQKDbQFDOsRBdtwRq38wYubljMp-qNvQF1uPHCLx-ws';

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='main-reservation-container w-100 mx-auto'
      >
        <h2>Rental Tank Homepage</h2>

        <div className='location-main-dropdown grid-item w-100'>
          <select
            className='form-select'
            id='location'
            name='location'
          >
            <option
              key={0}
              value=''
            >
              Select City
            </option>
            {locations?.map(loc => (
              <option
                key={loc.location_id}
                value={loc.location_id}
              >
                {loc.city}
              </option>
            ))}
          </select>
        </div>

        <div
          className='w-100'
          id='pickup-return-form'
        >
          <label
            className='form-label'
            htmlFor='pickUpTime'
          >
            Pick-up Time:
          </label>
          <input
            className='form-control'
            type='datetime-local'
            id='pickUpTime'
            name='pickUpTime'
          />
          <br /> {/* removed 'required' for testing */}
          <label
            className='form-label'
            htmlFor='returnTime'
          >
            Return Time:
          </label>
          <input
            className='form-control'
            type='datetime-local'
            id='returnTime'
            name='returnTime'
          />
          <br /> {/* removed 'required' for testing */}
        </div>

        <button
          id='browse-button'
          type='submit'
          className='mt-3'
        >
          Browse Vehicle
        </button>
      </form>
    </>
  );
};

export default RentalSearch;
