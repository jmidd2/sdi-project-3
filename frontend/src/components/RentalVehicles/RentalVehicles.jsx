import React from "react";

const RentalVehicles = ({vehicleList, resDetails}) => {
  console.log('resDetails: ', resDetails)

  const handleReservation = (vehicle) => {
    // verify user meant to click
    const confirm = window.confirm(`Reserve ${vehicle.model}?`)
    if (confirm) {
      console.log('confirmed')
      // fetch post to rentals
    }
    else {
      console.log('rejected')
    }
    console.log(resDetails);
  }

  return (
    <>
      <div>Rental Vehicles Placeholder</div>
      {resDetails.pickUpTime} - {resDetails.returnTime}
      {vehicleList?.map(vehicle => <div key={vehicle.tank_id}>
          {vehicle.model} | {vehicle.base_price}
          <button onClick={() => handleReservation(vehicle)}>Reserve</button>
        </div>)}
    </>
  )
}

export default RentalVehicles;