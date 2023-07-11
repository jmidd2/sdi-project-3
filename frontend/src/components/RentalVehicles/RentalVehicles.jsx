import React from "react";

const RentalVehicles = ({vehicleList, resDetails}) => {
  console.log('resDetails: ', resDetails)

  const handleReservation = async (vehicle) => {
    // verify user meant to click
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
    }
    else {
      console.log('rejected')
    }
  }

  return (
    <>
      <div>Available Vehicles</div>
      {resDetails.pickUpTime} - {resDetails.returnTime}
      {vehicleList?.map(vehicle => <div key={vehicle.tank_id}>
          {vehicle.model} | {vehicle.base_price}
          <button onClick={() => handleReservation(vehicle)}>Reserve</button>
        </div>)}
    </>
  )
}

export default RentalVehicles;