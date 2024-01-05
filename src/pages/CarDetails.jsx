import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
 
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7136/api/ApiCar/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }
  
  return (
  
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4">Car Details</h1>
      <div className="border p-4">
        <p>Brand: {car.carBrand?.brandName}</p>
        <p>Model: {car.carModel?.modelName}</p>
        <p>EnginePower: {car.enginePower}HP</p>
        <p>Condition: {car.carCondition?.condition}</p>
        <p>Color: {car.carColor?.color}</p>
        <p>FuelType: {car.carFuelType?.fuelType}</p>
        <p>TransMissionType: {car.carTransmissionType?.transmissionType}</p>
        <p>Mileage: {car.carMileage?.mileage}</p>
        <p>Seats: {car.carSeats?.numberofSeats}</p>
        <p>Location: {car.location}</p>
        <p>Features: {car.features}</p>
        <p>Description: {car.description}</p>
        <h3 className="text-xl font-bold">{car.price}$</h3>
      </div>
    </div>
  );
};

export default CarDetails;
