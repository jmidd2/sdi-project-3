import React from "react";

const RentalVehicles = ({vehicleList}) => {
  console.log(vehicleList)

  return (
    <>
      <div>Rental Vehicles Placeholder</div>
      {vehicleList?.map(vehicle => <div key={vehicle.tank_id}>
          {vehicle.model} | {vehicle.base_price}
          <button>Reserve</button>
        </div>)}
    </>
  )
}

export default RentalVehicles;