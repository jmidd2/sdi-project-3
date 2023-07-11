import {useEffect, useState} from 'react';
import './RentalSearch.scss';
import {CardGroup, Card} from 'react-bootstrap'

const RentalSearch = ({selectedCity, setSelectedCity, handleSubmit}) => {
  const [locations, setLocations] = useState([])

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  
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

  const budgetImage = 'https://i5.walmartimages.com/asr/48a76178-44a8-4ce8-b390-806293c92b5e.3221e739d36dedaf7d89546e144f771a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF';
  const premiumImage = 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80';
  const luxuryImage = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9abf1fec-c2c8-4387-91e2-8af03bc0d83e/df1700w-45eeedbd-df9e-4057-b4f6-30c936bd5377.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhYmYxZmVjLWMyYzgtNDM4Ny05MWUyLThhZjAzYmMwZDgzZVwvZGYxNzAwdy00NWVlZWRiZC1kZjllLTQwNTctYjRmNi0zMGM5MzZiZDUzNzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wQKDbQFDOsRBdtwRq38wYubljMp-qNvQF1uPHCLx-ws'
  
  return (
    <>
      <div className=''>
      <form onSubmit={handleSubmit} className="main-reservation-container">
        <h2>Rental Tank Homepage</h2>

        <div className="location-main-dropdown grid-item">
          <label htmlFor="location">Choose a city:</label>
          <select id="location" name="location" value={selectedCity} onChange={handleCityChange}>
            <option key={0} value="">Select City</option>
            {locations?.map(loc => (<option key={loc.location_id} value={loc.location_id}>{loc.city}</option>))}
          </select>
          {selectedCity && <p>Selected City: {selectedCity}</p>}
        </div>

        <div id="pickup-return-form">
          <label htmlFor="pickUpTime">Pick-up Time:</label>
          <input type="datetime-local" id="pickUpTime" name="pickUpTime"/><br /> {/* removed 'required' for testing */}
          <label htmlFor="returnTime">Return Time:</label>
          <input type="datetime-local" id="returnTime" name="returnTime" /><br /> {/* removed 'required' for testing */}
        </div>

        <CardGroup>
          <Card>
            <Card.Title>Budget</Card.Title>
            <input type="radio" id="budget" name="tier" value="1"/>
            <label htmlFor="budget">
              <Card.Img src={budgetImage}/>
            </label>
          </Card>
            <Card>
              <Card.Title>Premium</Card.Title>
              <input type="radio" id="premium" name="tier" value="2"/>
              <label htmlFor="premium">
                <Card.Img src={premiumImage}/>
              </label>
            </Card>
          <Card>
          <Card.Title className="text-center">Luxury</Card.Title>
            <input type="radio" id="luxury" name="tier" value="3"/>
            <label htmlFor="luxury">
              <Card.Img variant="bottom" src={luxuryImage}/>
            </label>
          </Card>
        </CardGroup>


        <button id="browse-button" type="submit">Browse Vehicle</button>
      </form>
      </div>
    </>
  );
};

export default RentalSearch;