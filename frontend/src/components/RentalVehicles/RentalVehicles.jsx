import React from "react";
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {Card} from 'react-bootstrap'
import './RentalVehicles.scss'

const RentalVehicles = ({vehicleList, resDetails}) => {
  console.log('resDetails: ', resDetails)
  const navigate = useNavigate()

  const handleReservation = async (vehicle) => {
    // verify user meant to click
    console.log(vehicle)
    const confirm = window.confirm(`Reserve ${vehicle.model}?`)
    if (confirm) {
      // fetch post to rentals
      let token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1]

      let response = await fetch('http://localhost:3001/rentals/reservation', {
            method: "POST",
            body: JSON.stringify({...resDetails, ...vehicle}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
      console.log(await response)
      navigate('/reservations')
    }
    else {
      console.log('rejected')
    }
  }

  const handleImg = (vehicle) => {
    if (vehicle.model.includes('M1A1')) {
      return 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
    }
    else if (vehicle.model.includes('Ravager')) {
      return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9abf1fec-c2c8-4387-91e2-8af03bc0d83e/df1700w-45eeedbd-df9e-4057-b4f6-30c936bd5377.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhYmYxZmVjLWMyYzgtNDM4Ny05MWUyLThhZjAzYmMwZDgzZVwvZGYxNzAwdy00NWVlZWRiZC1kZjllLTQwNTctYjRmNi0zMGM5MzZiZDUzNzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wQKDbQFDOsRBdtwRq38wYubljMp-qNvQF1uPHCLx-ws'
    }
    else if (vehicle.model.includes('Power Wheels')) {
      return 'https://i5.walmartimages.com/asr/48a76178-44a8-4ce8-b390-806293c92b5e.3221e739d36dedaf7d89546e144f771a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    }
  }

  return (
    <>
      {/* <span>{resDetails.pickUpTime} - {resDetails.returnTime}</span> */}
      <h2 className="resultsHeader">Available Vehicles</h2>
      <div className='resultsContainer'>
        {vehicleList?.map(vehicle => 
          (<Card className="results" key={vehicle.tank_id}>
            <span><strong>Model:</strong> {vehicle.model}<br></br><strong>Price:</strong> {vehicle.base_price}</span>
            <img className="tankImg" src={handleImg(vehicle)} alt=""/>
            <span></span>
            <button className='resultsBtn btn btn-info' onClick={() => handleReservation(vehicle)}>Reserve</button>
          </Card>))}
      </div>
    </>
  )
}

export default RentalVehicles;