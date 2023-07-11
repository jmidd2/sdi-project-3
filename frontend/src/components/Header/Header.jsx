import React from 'react';
import { useNavigate } from 'react-router-dom';

 const Header = () => {
  const navigate = useNavigate()
  return (
  // function Header(){
    // const isRentalDetailsPage=location.pathname==='/RentalDetails';
      // const location = useLocation();
    
        <nav className="navbar bg-success bg-gradient">
          <div className="container-fluid justify-content-left">
            <span onClick={() => navigate('/')} className="navbar-brand text-white mb-0 h1 px-5">Tankvana</span>

            {/*isRentalDetailsPage &&(
              <button className="reservation-button">Reservation</button>
            )*/}
          </div>
        </nav>
    )

  }




export default Header;