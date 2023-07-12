import React, {useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../AppLayout/AppLayout';
import { Container, Nav, Navbar } from 'react-bootstrap';

 const Header = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AppContext)

  const logout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
  // function Header(){
    // const isRentalDetailsPage=location.pathname==='/RentalDetails';
      // const location = useLocation();
    <>
        {/* <nav className="navbar bg-success bg-gradient">
          <div className="container-fluid justify-content-left">
            <span onClick={() => navigate('/')} className="navbar-brand text-white mb-0 h1 px-5">Tankvana</span>
            <span onClick={() => navigate('/reservations')} className="text-white mb-0 h1 px-5">Reservations</span>
            <Link onClick={(e) => logout(e)} href="#" className="text-white">Logout</Link>

            isRentalDetailsPage &&(
              <button className="reservation-button">Reservation</button>
            )
          </div>
        </nav> */}
        <Navbar className="bg-success bg-gradient">
          <Container className=''>
            <Navbar.Brand href="/"><strong>Tankvana</strong></Navbar.Brand>
            <Nav className='me-auto ms-2'>
                <Nav.Link className="link-light" href='/reservations'>Reservations</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="link-light" onClick={(e) => logout(e)}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </>
    )

  }




export default Header;