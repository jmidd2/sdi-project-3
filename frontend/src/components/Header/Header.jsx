import React from 'react';
//import { Link, useLocation } from 'react-router-dom';

 const Header = () => (
 // function Header(){
   // const isRentalDetailsPage=location.pathname==='/RentalDetails';
    // const location = useLocation();
  
      <nav className="navbar bg-success bg-gradient fixed-top">
        <div className="container-fluid justify-content-left">
          <span className="navbar-brand text-white mb-0 h1 px-5">Tankvana</span>

          {/*isRentalDetailsPage &&(
            <button className="reservation-button">Reservation</button>
          )*/}
        </div>
      </nav>
    )




export default Header;