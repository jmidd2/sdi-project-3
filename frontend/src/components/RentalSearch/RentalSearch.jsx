import {useState} from 'react';
import './RentalSearch.scss';
import {CardGroup, Card} from 'react-bootstrap'

const RentalSearch = ({selectedCity, setSelectedCity}) => {
  const [pickUpTime, setPickUpTime] = useState('');
  const [returnTime, setReturnTime] = useState('');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const budgetImage = 'https://i5.walmartimages.com/asr/48a76178-44a8-4ce8-b390-806293c92b5e.3221e739d36dedaf7d89546e144f771a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF';
  const premiumImage = 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80';
  const luxuryImage = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9abf1fec-c2c8-4387-91e2-8af03bc0d83e/df1700w-45eeedbd-df9e-4057-b4f6-30c936bd5377.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhYmYxZmVjLWMyYzgtNDM4Ny05MWUyLThhZjAzYmMwZDgzZVwvZGYxNzAwdy00NWVlZWRiZC1kZjllLTQwNTctYjRmNi0zMGM5MzZiZDUzNzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wQKDbQFDOsRBdtwRq38wYubljMp-qNvQF1uPHCLx-ws'
  
  return (
    <div className="main-container">
      <nav className="Header">
        <div className="logo">Logo</div>
        <div className="Reservation">Reservation</div>
      </nav>

      <div className="main-reservation-container">
        <h2>Rental Tank Homepage</h2>

        <div className="location-main-dropdown grid-item">
          <label htmlFor="city">Choose a city:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select City</option>
            <option value="Kharkiv">Kharkiv</option>
            <option value="Kherson">Kherson</option>
            <option value="Kyiv">Kyiv</option>
            <option value="Odessa">Odessa</option>
          </select>
          {selectedCity && <p>Selected City: {selectedCity}</p>}
        </div>

        <form id="pickup-return-form">
          <label htmlFor="pick-up-time">Pick-up Time:</label>
          <input type="datetime-local" id="pick-up-time" required/><br />
          <label htmlFor="return-time">Return Time:</label>
          <input type="datetime-local" id="return-time" required /><br />
        </form>

        <CardGroup>
          <Card>
            <Card.Title>Budget</Card.Title>
            <input type="radio" id="budget" name="tier" value="Budget"/>
            <label for="budget">
              <Card.Img src={budgetImage}/>
            </label>
          </Card>
            <Card>
              <Card.Title>Premium</Card.Title>
              <input type="radio" id="premium" name="tier" value="Premium"/>
              <label for="premium">
                <Card.Img src={premiumImage}/>
              </label>
            </Card>
          <Card>
          `<Card.Title className="text-center">Luxury</Card.Title>
            <input type="radio" id="luxury" name="tier" value="Luxury"/>
            <label for="luxury">
              <Card.Img variant="bottom" src={luxuryImage}/>
            </label>
          </Card>
        </CardGroup>


        <button id="browse-button">Browse Vehicle</button>
      </div>
    </div>
  );
};

export default RentalSearch;